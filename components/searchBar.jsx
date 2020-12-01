import React, { useState } from "react";
import {
  FormControl,
  FilledInput,
  InputLabel,
  InputAdornment,
  Icon,
  Typography,
} from "@material-ui/core";
import { useRouter } from "next/router";

const searchDebouncer = Debouncer(500);

export default function SearchBar() {
  const router = useRouter();

  return (
    <form noValidate autoComplete="off">
      <FormControl variant="filled" style={{ width: "100%" }}>
        <InputLabel>Search any algorithm</InputLabel>
        <FilledInput
          onInput={
            (event) =>
              searchDebouncer(() => {
                if (!event.target.value) router.push("/");
                else router.push(`/search/${event.target.value}`);
                // console.log(`/search/${event.target.value}`);
              })
            // dispatch({ key: "query", value: event.target.value });
          }
          name="q"
          endAdornment={
            <InputAdornment position="end">
              <Icon>search</Icon>
            </InputAdornment>
          }
        />
      </FormControl>
    </form>
  );
}

function Debouncer(time) {
  let timeout;
  return function (func) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(func, time);
  };
}
