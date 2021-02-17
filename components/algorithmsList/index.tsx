import { Divider, Typography } from "@material-ui/core";
import React, { Fragment, useMemo } from "react";
import { Algorithm } from "lib/models";
import { normalize } from "lib/normalize";
import AlgorithmCard from "./algorithmCard";
import classes from "./style.module.css";

export default function AlgorithmsList({ algorithms, noCategories = false }) {
  const splitAlgorithms = useMemo(() => {
    const ret: { [key: string]: Algorithm[] } = {};
    algorithms.forEach((algorithm: Algorithm) => {
      const key = algorithm.categories[0]
        ? normalize(algorithm.categories[0])
        : "";
      if (ret[key]) ret[key].push(algorithm);
      else ret[key] = [algorithm];
    });
    return Object.keys(ret)
      .sort()
      .reduce((obj, key) => ({ ...obj, [key]: ret[key] }), {});
  }, [algorithms]);

  return (
    <>
      {noCategories ? (
        <div className={classes.grid}>
          {algorithms.map((algorithm: Algorithm) => (
            <div key={algorithm.slug}>
              <AlgorithmCard algorithm={algorithm} />
            </div>
          ))}
        </div>
      ) : (
        Object.keys(splitAlgorithms).map((key) => (
          <Fragment key={key}>
            {Object.keys(splitAlgorithms).length > 1 && (
              <Typography
                color="textSecondary"
                variant="h6"
                className={classes.subtitle}
              >
                {key}
                <Divider />
              </Typography>
            )}

            <div className={classes.grid}>
              {splitAlgorithms[key].map((algorithm: Algorithm) => (
                <div key={algorithm.slug}>
                  <AlgorithmCard algorithm={algorithm} />
                </div>
              ))}
            </div>
          </Fragment>
        ))
      )}
    </>
  );
}
