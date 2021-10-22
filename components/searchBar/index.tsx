import React, { FormEvent, useEffect, useRef } from "react";
import useTranslation from "hooks/translation";
import {
  FormControl,
  FilledInput,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  useMediaQuery,
  IconButton,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { Search } from "@material-ui/icons";

function Debouncer(time: number) {
  let timeout: NodeJS.Timeout;
  return (func: () => void) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(func, time);
  };
}

const debounce = Debouncer(200);

export default function SearchBar({
  small = false,
  query,
  setQuery,
  className = "",
}) {
  const t = useTranslation();
  const router = useRouter();
  const smallScreen = useMediaQuery("(max-width: 800px)");
  const inputRef = useRef<HTMLInputElement>();

  function handleInput(event: FormEvent) {
    setQuery((event.target as HTMLInputElement).value);
    if (!smallScreen)
      debounce(() => {
        router.push(`/search?q=${(event.target as HTMLInputElement).value}`);
      });
  }

  function handleSubmit(event?: FormEvent) {
    if (event) event.preventDefault();
    // For performance reasons the input on small screens is not controlled
    router.push(`/search?q=${smallScreen ? inputRef.current.value : query}`);
  }

  const searchAdornment = (
    <InputAdornment position="end">
      <IconButton
        style={{ marginRight: -12 }}
        onClick={() => handleSubmit()}
        aria-label="Search"
      >
        <Search />
      </IconButton>
    </InputAdornment>
  );

  useEffect(() => {
    if (router.route.startsWith("/search")) {
      inputRef.current.focus();
    }
  }, [router.route]);

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      className={className}
      action="/search"
      method="GET"
    >
      {/* ESLint is broken here */}
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="search" style={{ display: "none" }}>
        {t("searchText")}
      </label>
      {small ? (
        <FormControl variant="outlined" size="small">
          {smallScreen ? (
            <OutlinedInput
              id="search"
              name="q"
              placeholder={t("searchText")}
              endAdornment={searchAdornment}
              inputRef={inputRef}
            />
          ) : (
            <OutlinedInput
              id="search"
              name="q"
              onInput={(event: FormEvent) => handleInput(event)}
              value={query}
              placeholder={t("searchText")}
              endAdornment={searchAdornment}
              inputRef={inputRef}
            />
          )}
        </FormControl>
      ) : (
        <FormControl variant="filled" style={{ width: "100%" }} size="medium">
          <>
            <InputLabel>{t("searchText")}</InputLabel>
            {smallScreen ? (
              <FilledInput
                id="search"
                name="q"
                endAdornment={searchAdornment}
                inputRef={inputRef}
              />
            ) : (
              <FilledInput
                id="search"
                name="q"
                onInput={(event: FormEvent) => handleInput(event)}
                value={query}
                endAdornment={searchAdornment}
                inputRef={inputRef}
              />
            )}
          </>
        </FormControl>
      )}
    </form>
  );
}
