import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Breadcrumbs,
} from "@material-ui/core";
import React from "react";
import Implementations from "components/implementations";
import { normalize } from "lib/normalize";
import Link from "components/link";
import { Algorithm } from "lib/models";
import classes from "./style.module.css";
import { useTranslation } from "next-i18next";

export default function AlgorithmCard({ algorithm }: { algorithm: Algorithm }) {
  const { t } = useTranslation("common");
  return (
    <Card className={classes.root}>
      <CardContent>
        <Breadcrumbs>
          {algorithm.categories.map((category) => (
            <Typography
              variant="h6"
              className={classes.category}
              key={category}
            >
              <Link href={`/category/${normalize(category)}`}>{category}</Link>
            </Typography>
          ))}
        </Breadcrumbs>
        <Typography variant="h5" component="h2" className={classes.title}>
          {algorithm.name}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Implementations implementations={algorithm.implementations} />
        <Link href={`/algorithm/${algorithm.slug}`}>
          <Button color="primary">{t("moreAlgorithmCard")}</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
