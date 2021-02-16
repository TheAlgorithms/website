import React, { FormEvent } from "react";
import {
  FormControl,
  FilledInput,
  InputLabel,
  InputAdornment,
  Icon,
  OutlinedInput,
} from "@material-ui/core";
import { useRouter } from "next/router";

const searchAdornment = (
  <InputAdornment position="end">
    <Icon>search</Icon>
  </InputAdornment>
);

function Debouncer(time: number) {
  let timeout: NodeJS.Timeout;
  return (func: () => void) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(func, time);
  };
}

const debounce = Debouncer(200);

export default function SearchBar({ small = false, query, setQuery }) {
  const router = useRouter();

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
      {/* <TextField
        variant={small ? "outlined" : "filled"}
        size={small ? "small" : "medium"}
        style={{ width: "100%" }}
        label={!small ? "Search any algorithm" : ""}
        placeholder={small ? "Search any algorithm" : ""}
        onInput={handleInput}
        value={query}
        id="searchBar"
      ></TextField> */}

      {small ? (
        <FormControl variant="outlined" size="small">
          <OutlinedInput
            onInput={handleInput}
            value={query}
            placeholder="Search any algorithm"
            endAdornment={searchAdornment}
            autoFocus
          />
        </FormControl>
      ) : (
        <FormControl variant="filled" style={{ width: "100%" }} size="medium">
          <>
            <InputLabel>Search any algorithm</InputLabel>
            <FilledInput
              onInput={handleInput}
              endAdornment={searchAdornment}
              value={query}
            />
          </>
        </FormControl>
      )}
    </form>
  );
}
