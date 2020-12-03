import React, { FormEvent, useState } from "react";
import {
  FormControl,
  FilledInput,
  InputLabel,
  InputAdornment,
  Icon,
  Input,
  OutlinedInput,
} from "@material-ui/core";
import { useRouter } from "next/router";

const debounce = Debouncer(200);

export default function SearchBar({ small = false }) {
  const router = useRouter();
  const [query, setQuery] = useState(router.query.q as string);

  function handleInput(event: FormEvent) {
    setQuery((event.target as HTMLInputElement).value);
    debounce(() => {
      router.push(`/search?q=${(event.target as HTMLInputElement).value}`);
    });
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    router.push(`/search?q=${query}`);
  }

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <FormControl
        variant="filled"
        style={{ width: "100%" }}
        size={small ? "small" : "medium"}
      >
        {!small ? (
          <React.Fragment>
            <InputLabel>Search any algorithm</InputLabel>
            <FilledInput
              onInput={handleInput}
              endAdornment={searchAdornment}
              value={query}
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <OutlinedInput
              onInput={handleInput}
              value={query}
              placeholder="Search any algorithm"
              autoFocus
            />
          </React.Fragment>
        )}
      </FormControl>
    </form>
  );
}

const searchAdornment = (
  <InputAdornment position="end">
    <Icon>search</Icon>
  </InputAdornment>
);

function Debouncer(time: number) {
  let timeout;
  return function (func: () => void) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(func, time);
  };
}
