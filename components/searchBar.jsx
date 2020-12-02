import React, { useState } from "react";
import {
  FormControl,
  FilledInput,
  InputLabel,
  InputAdornment,
  Icon,
  CircularProgress,
} from "@material-ui/core";
import { useRouter } from "next/router";

const searchDebouncer = Debouncer(200);

export default function SearchBar() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <FormControl variant="filled" style={{ width: "100%" }}>
        <InputLabel>Search any algorithm</InputLabel>
        <FilledInput
          onInput={(event) => {
            setLoading(true);
            searchDebouncer(() => {
              if (!event.target.value)
                router.push("/").then(() => setLoading(false));
              else
                router
                  .push(`/search/${event.target.value}`)
                  .then(() => setLoading(false));
            });
          }}
          name="q"
          endAdornment={
            <InputAdornment position="end">
              {loading ? <CircularProgress size={24} /> : <Icon>search</Icon>}
            </InputAdornment>
          }
        />
      </FormControl>
    </form>
  );
}

function handleSubmit(event) {
  event.preventDefault();
}

function Debouncer(time) {
  let timeout;
  return function (func) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(func, time);
  };
}
