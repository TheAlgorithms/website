import React from "react";
import { Algorithm } from "../../lib/models";
import AlgorithmCard from "./algorithmCard";
import classes from "./style.module.css";

export default function AlgorithmsList({ algorithms }) {
  return (
    <div className={classes.grid}>
      {algorithms.map((algorithm: Algorithm) => (
        <div key={algorithm.slug}>
          <AlgorithmCard algorithm={algorithm} />
        </div>
      ))}
    </div>
  );
}
