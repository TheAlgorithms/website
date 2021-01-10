import React, { FormEvent, useState } from "react";
import {
  FormControl,
  FilledInput,
  InputLabel,
  InputAdornment,
  Icon,
  Input,
  OutlinedInput,
  TextField,
} from "@material-ui/core";
import { useRouter } from "next/router";

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
        <FormControl variant="outlined" size={"small"}>
          <OutlinedInput
            onInput={handleInput}
            value={query}
            placeholder="Search any algorithm"
            endAdornment={searchAdornment}
            autoFocus
          />
        </FormControl>
      ) : (
        <FormControl variant="filled" style={{ width: "100%" }} size={"medium"}>
          <React.Fragment>
            <InputLabel>Search any algorithm</InputLabel>
            <FilledInput
              onInput={handleInput}
              endAdornment={searchAdornment}
              value={query}
            />
          </React.Fragment>
        </FormControl>
      )}
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
