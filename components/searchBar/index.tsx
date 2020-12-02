import React, { FormEvent, useState } from "react";
import {
  FormControl,
  FilledInput,
  InputLabel,
  InputAdornment,
  Icon,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { useGlobalState } from "../../hooks/globalState";

const debounce = Debouncer(200);

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState(router.query.q as string);

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <FormControl variant="filled" style={{ width: "100%" }}>
        <InputLabel>Search any algorithm</InputLabel>
        <FilledInput
          onInput={(event: FormEvent) => {
            setQuery((event.target as HTMLInputElement).value);
            debounce(() => {
              // dispatch({
              //   key: "query",
              //   value: (event.target as HTMLInputElement).value,
              // });
              router.push(
                `/search?q=${(event.target as HTMLInputElement).value}`
              );
            });
          }}
          name="q"
          endAdornment={
            <InputAdornment position="end">
              <Icon>search</Icon>
            </InputAdornment>
          }
          value={query}
        />
      </FormControl>
    </form>
  );
}

function handleSubmit(event: FormEvent) {
  event.preventDefault();
}

function Debouncer(time: number) {
  let timeout;
  return function (func: () => void) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(func, time);
  };
}
