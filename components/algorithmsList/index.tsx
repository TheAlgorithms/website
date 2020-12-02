import React from "react";
import AlgorithmCard from "./algorithmCard";
import classes from "./style.module.css";

export default function AlgorithmsList({ algorithms }) {
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
