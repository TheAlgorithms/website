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
import NextLink from "next/link";
import Link from "components/link";
import { Algorithm } from "lib/models";
import useTranslation from "hooks/translation";
import classes from "./style.module.css";

export default function AlgorithmCard({ algorithm }: { algorithm: Algorithm }) {
  const t = useTranslation();

  return (
    <Card className="elevateOnHover">
      <CardContent>
        <Breadcrumbs>
          {algorithm.categories.map((category) => (
            <Typography
              variant="h6"
              className={classes.category}
              key={category}
            >
              <Link href={`/category/${normalize(category)}`}>
                {t(`categories:${category}`)}
              </Link>
            </Typography>
          ))}
        </Breadcrumbs>
        <Typography variant="h5" component="h2" className={classes.title}>
          {algorithm.name}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Implementations implementations={algorithm.implementations} />
        <NextLink href={`/algorithm/${algorithm.slug}`}>
          <Button color="primary" aria-label={`View ${algorithm.name}`}>
            {t("moreAlgorithmCard")}
          </Button>
        </NextLink>
      </CardActions>
    </Card>
  );
}
