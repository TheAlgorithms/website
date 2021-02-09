import React, { useEffect, useState } from "react";
import AlgorithmsList from "../../components/algorithmsList";
import search from "../../lib/search";
import Section from "../../components/section";
import { Button, Icon } from "@material-ui/core";
import { useRouter } from "next/router";
import classes from "./search.module.css";
import Head from "../../components/head";

export default function Search() {
  const router = useRouter();
  const [limit, setLimit] = useState(27);

  const algorithms = search(router.query.q as string, limit);

  useEffect(() => {
    if (router.query.q) {
      setLimit(27);
    }
  }, [router.query]);

  return (
    <React.Fragment>
      <Head title={router.query.q && `"${router.query.q}"`} />
      <Section title={`Search${router.query.q && ` "${router.query.q}"`}`}>
        {router.query.q && <AlgorithmsList algorithms={algorithms} />}
        {algorithms.length === limit && (
          <Button
            onClick={() => setLimit(undefined)}
            className={classes.more}
            startIcon={<Icon>add</Icon>}
          >
            More
          </Button>
        )}
      </Section>
    </React.Fragment>
  );
}
