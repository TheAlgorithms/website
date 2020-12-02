import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Breadcrumbs,
} from "@material-ui/core";
import React from "react";
import Implementations from "../../implementations";
import { normalize } from "../../../lib/normalize";
import Link from "../../link";
import classes from "./style.module.css";

export default function AlgorithmCard({ algorithm }) {
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
