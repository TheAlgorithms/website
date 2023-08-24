import React, { FormEvent, useEffect, useRef, useState } from "react";
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

  let debounceTimeout: NodeJS.Timeout;
  let lastInputValue = ""; // Store the last input value

  // Input validation
  const [isEmpty, setIsEmpty] = useState(!query);
  const [isError, setIsError] = useState(false);

  function handleInput(event: FormEvent) {
    const inputValue = (event.target as HTMLInputElement).value;

    setQuery(inputValue);

    // When input value is null, set error & empty state to `true` and do nothing.
    if (!inputValue) {
      setIsEmpty(true);
      setIsError(true);
      return;
    }

    // When input value is not null, reset error & empty state to `false`.
    setIsError(false);
    setIsEmpty(false);

    if (!smallScreen) {
      // Store the debounced function in a variable to be able to cancel it later
      const debouncedFunc = () => {
        router.push(`/search?q=${inputValue}`);
      };
      debounceTimeout = setTimeout(debouncedFunc, 200);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    // Check if the Backspace key is pressed and the input value becomes empty
    if (event.key === "Backspace" && lastInputValue === "") {
      // Navigate back to the initial page
      router.push("/");
    }

    // Update the last input value
    lastInputValue = (event.target as HTMLInputElement).value;
  }

  const searchAdornment = (
    <InputAdornment position="end">
      <IconButton
        style={{ marginRight: -12 }}
        onClick={() => handleSubmit()}
        aria-label="Search"
        disabled={isEmpty}
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

  function handleSubmit(event?: FormEvent) {
    if (event) event.preventDefault();

    // When input value is null, set error & empty state to `true` and do nothing.
    if (!query || !inputRef.current.value) {
      setIsError(true);
      setIsEmpty(true);
      return;
    }

    // When input value is not null, reset error & empty state to `false` and push the route.
    setIsError(false);
    setIsEmpty(false);

    // For performance reasons the input on small screens is not controlled
    router.push(`/search?q=${smallScreen ? inputRef.current.value : query}`);
  }

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
              error={isError}
              onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) =>
                handleKeyDown(event)
              }
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
              error={isError}
              onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) =>
                handleKeyDown(event)
              }
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
                error={isError}
                onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) =>
                  handleKeyDown(event)
                }
              />
            ) : (
              <FilledInput
                id="search"
                name="q"
                onInput={(event: FormEvent) => handleInput(event)}
                value={query}
                endAdornment={searchAdornment}
                inputRef={inputRef}
                error={isError}
                onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) =>
                  handleKeyDown(event)
                }
              />
            )}
          </>
        </FormControl>
      )}
    </form>
  );
}
