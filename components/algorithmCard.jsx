import {
  Typography,
  Card,
  CardContent,
  Icon,
  CardActions,
  Button,
  Breadcrumbs,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Implementations from "./implementations";
import { useRouter } from "next/router";
import { normalize } from "../lib/normalize";
import Link from "./link";

const useStyles = makeStyles((theme) => ({
  root: {},
  category: {
    fontSize: 14,
  },
  title: {
    marginBottom: "10px",
  },
  actions: {
    justifyContent: "space-between",
  },
}));

export default function AlgorithmCard({ algorithm }) {
  const router = useRouter();
  let classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Breadcrumbs>
          <Typography variant="h6" className={classes.category}>
            <Link href={`/${normalize(algorithm.category)}`}>
              {algorithm.category}
            </Link>
          </Typography>
          {algorithm.subCategory && (
            <Typography variant="h6" className={classes.category}>
              <Link
                href={`/${normalize(algorithm.category)}/${normalize(
                  algorithm.subCategory
                )}`}
              >
                {algorithm.subCategory}
              </Link>
            </Typography>
          )}
        </Breadcrumbs>
        <Typography variant="h5" component="h2" className={classes.title}>
          {algorithm.name}
        </Typography>
        <Typography>{algorithm.description}</Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Implementations implementations={algorithm.implementations} />
        <Link href={`/algorithm/${algorithm.slug}`}>
          <Button color="primary">More</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
