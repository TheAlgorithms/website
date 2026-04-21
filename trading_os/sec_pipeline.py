import json
import os
import re
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

import requests
from anthropic import Anthropic
from bs4 import BeautifulSoup
from dotenv import load_dotenv

SYSTEM_PROMPT = (
    "You are a hostile, skeptical financial auditor. I will provide you with Item 1A and Item 7 "
    "from a company's SEC filing. You must extract only the worst-case physical supply chain "
    "bottlenecks, inventory bloat, and capital expenditure risks. Do not summarize the whole "
    "document. Output a strict markdown report answering: 1. Worst-case admitted scenario. "
    "2. Supply chain expanding/contracting? 3. Inventory/CapEx bloat. 4. Does management's tone "
    "match the SEC filings? 5. Final Verdict (HOLD/CAUTION/VALIDATED)."
)

USER_AGENT = "TradingOSFundamentalPipeline/1.0 (contact: compliance@trading-os.local)"
SEC_TICKER_CIK_URL = "https://www.sec.gov/files/company_tickers.json"
SEC_SUBMISSIONS_URL = "https://data.sec.gov/submissions/CIK{cik}.json"
SEC_ARCHIVE_BASE = "https://www.sec.gov/Archives/edgar/data"
DEFAULT_ANTHROPIC_MODEL = "claude-3-haiku-20240307"
DEFAULT_MAX_TOKENS = 1200
ENV_KEY_PLACEHOLDER = "your_key_here"


def _flatten_tickers(value: Any) -> List[str]:
    tickers: List[str] = []

    if isinstance(value, str):
        cleaned = value.strip().upper()
        if cleaned:
            tickers.append(cleaned)
    elif isinstance(value, list):
        for item in value:
            tickers.extend(_flatten_tickers(item))
    elif isinstance(value, dict):
        for key, item in value.items():
            if isinstance(key, str):
                upper_key = key.strip().upper()
                if upper_key.isalpha() and 1 <= len(upper_key) <= 6:
                    tickers.append(upper_key)
            tickers.extend(_flatten_tickers(item))

    return tickers


def load_tickers_from_state(state_path: Path) -> List[str]:
    with state_path.open("r", encoding="utf-8") as file:
        state_data = json.load(file)

    universe = state_data.get("portfolio_state", {}).get("universe", {})
    flattened = _flatten_tickers(universe)

    deduped: List[str] = []
    seen = set()
    for ticker in flattened:
        if ticker not in seen:
            seen.add(ticker)
            deduped.append(ticker)

    return deduped


def get_ticker_to_cik_map(session: requests.Session) -> Dict[str, str]:
    response = session.get(SEC_TICKER_CIK_URL, timeout=30)
    response.raise_for_status()
    payload = response.json()

    mapping: Dict[str, str] = {}
    for _, row in payload.items():
        ticker = str(row.get("ticker", "")).upper()
        cik = str(row.get("cik_str", "")).zfill(10)
        if ticker and cik:
            mapping[ticker] = cik

    return mapping


def fetch_latest_filing_url(
    session: requests.Session, cik: str
) -> Optional[Tuple[str, str, str]]:
    response = session.get(SEC_SUBMISSIONS_URL.format(cik=cik), timeout=30)
    response.raise_for_status()
    payload = response.json()

    recent = payload.get("filings", {}).get("recent", {})
    forms = recent.get("form", [])
    accession_numbers = recent.get("accessionNumber", [])
    primary_documents = recent.get("primaryDocument", [])

    for idx, form in enumerate(forms):
        if form in {"10-K", "10-Q"}:
            accession = accession_numbers[idx]
            primary_doc = primary_documents[idx]
            accession_no_dashes = accession.replace("-", "")
            cik_int = str(int(cik))
            filing_url = (
                f"{SEC_ARCHIVE_BASE}/{cik_int}/{accession_no_dashes}/{primary_doc}"
            )
            return form, accession, filing_url

    return None


def extract_text_sections(html: str) -> Tuple[str, str]:
    soup = BeautifulSoup(html, "html.parser")
    text = soup.get_text("\n")
    normalized_text = re.sub(r"\n+", "\n", text)

    item_1a_pattern = re.compile(
        r"(?is)item\s*1a\.?\s*risk\s*factors(.*?)(?=item\s*1b\.?|item\s*2\.?|item\s*7\.?)"
    )
    item_7_pattern = re.compile(
        r"(?is)item\s*7\.?\s*management['’]s\s*discussion\s*and\s*analysis(.*?)(?=item\s*7a\.?|item\s*8\.?)"
    )

    item_1a_match = item_1a_pattern.search(normalized_text)
    item_7_match = item_7_pattern.search(normalized_text)

    item_1a_text = item_1a_match.group(0).strip() if item_1a_match else ""
    item_7_text = item_7_match.group(0).strip() if item_7_match else ""

    return item_1a_text, item_7_text


def analyze_with_claude(client: Anthropic, ticker: str, item_1a: str, item_7: str) -> str:
    user_prompt = (
        f"Ticker: {ticker}\n\n"
        f"Item 1A. Risk Factors:\n{item_1a or '[Missing in parsed filing]'}\n\n"
        f"Item 7. Management's Discussion and Analysis:\n"
        f"{item_7 or '[Missing in parsed filing]'}"
    )

    response = client.messages.create(
        model=os.getenv("ANTHROPIC_MODEL", DEFAULT_ANTHROPIC_MODEL),
        max_tokens=int(os.getenv("ANTHROPIC_MAX_TOKENS", str(DEFAULT_MAX_TOKENS))),
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": user_prompt}],
    )

    parts: List[str] = []
    for block in response.content:
        block_text = getattr(block, "text", "")
        if block_text:
            parts.append(block_text)

    return "\n".join(parts).strip()


def append_audit_log(report_path: Path, ticker: str, content: str) -> None:
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    entry = (
        f"\n## {timestamp} - {ticker}\n\n"
        f"{content.strip() if content else 'No content generated.'}\n"
        "\n---\n"
    )

    with report_path.open("a", encoding="utf-8") as log_file:
        log_file.write(entry)


def main() -> None:
    load_dotenv()
    api_key = os.getenv("LLM_API_KEY", "").strip()
    if not api_key or api_key == ENV_KEY_PLACEHOLDER:
        raise RuntimeError(
            "Missing valid LLM_API_KEY in .env. Update trading_os/.env before running."
        )

    cwd = Path.cwd()
    state_path = cwd / "portfolio_state.json"
    if not state_path.exists():
        raise FileNotFoundError(f"portfolio_state.json not found at: {state_path}")

    reports_dir = cwd / "reports"
    reports_dir.mkdir(parents=True, exist_ok=True)
    report_path = reports_dir / "audit_log.md"

    tickers = load_tickers_from_state(state_path)
    if not tickers:
        raise ValueError("No tickers found in portfolio_state.universe")

    session = requests.Session()
    session.headers.update({"User-Agent": USER_AGENT, "Accept-Encoding": "gzip, deflate"})

    ticker_to_cik = get_ticker_to_cik_map(session)
    anthropic_client = Anthropic(api_key=api_key)

    for ticker in tickers:
        try:
            cik = ticker_to_cik.get(ticker)
            if not cik:
                append_audit_log(report_path, ticker, "CIK not found for ticker.")
                continue

            filing_meta = fetch_latest_filing_url(session, cik)
            if not filing_meta:
                append_audit_log(
                    report_path,
                    ticker,
                    "No recent Form 10-K or 10-Q found in SEC submissions.",
                )
                continue

            form_type, accession, filing_url = filing_meta
            filing_response = session.get(filing_url, timeout=45)
            filing_response.raise_for_status()

            item_1a_text, item_7_text = extract_text_sections(filing_response.text)
            llm_report = analyze_with_claude(
                anthropic_client,
                ticker,
                item_1a=item_1a_text,
                item_7=item_7_text,
            )

            combined_report = (
                f"**Form:** {form_type}  \\n"
                f"**Accession:** {accession}  \\n"
                f"**Filing URL:** {filing_url}\n\n"
                f"{llm_report}"
            )
            append_audit_log(report_path, ticker, combined_report)
            print(f"Processed {ticker}")
        except Exception as exc:
            append_audit_log(report_path, ticker, f"Error: {exc}")
            print(f"Failed {ticker}: {exc}")


if __name__ == "__main__":
    main()
