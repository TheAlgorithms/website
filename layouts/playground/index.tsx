import Navbar from "components/navbar";
import React, { ReactNode } from "react";
import classes from "./style.module.css";

export default function PlaygroundLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={classes.root}>
      <Navbar title="Code Playground" wide />
      {children}
    </div>
  );
}
