import Navbar from "components/navbar";
import React, { ReactNode } from "react";
import useTranslation from "hooks/translation";
import classes from "./style.module.css";

export default function PlaygroundLayout({
  children,
}: {
  children: ReactNode;
}) {
  const t = useTranslation();
  return (
    <div className={classes.root}>
      <Navbar title={t("codeplayground")} wide />
      {children}
    </div>
  );
}
