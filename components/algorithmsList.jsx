import { Typography, Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import AlgorithmCard from "./algorithmCard";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    columnGap: "20px",
    rowGap: "20px",
    lineBreak: "anywhere",
  },
}));

export default function AlgorithmsList({ algorithms }) {
  let classes = useStyles();

  return (
    <div className={classes.grid}>
      {algorithms.map((algorithm) => (
        <div key={algorithm.slug}>
          <AlgorithmCard algorithm={algorithm} />
        </div>
      ))}
    </div>
  );
}
