import { Button, Typography } from "@material-ui/core";
import NextLink from "next/link";
import { CSSProperties } from "react";
import classes from "./style.module.css";

export default function Section({
  title,
  children,
  more,
  className = "",
  style = {},
}: {
  title?: React.ReactNode;
  children: React.ReactNode;
  more?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={className} style={style}>
      <div className={`section container ${classes.container}`}>
        {title && (
          <Typography variant="h4" className={classes.title}>
            {title}
          </Typography>
        )}
        {children}
        {more && (
          <NextLink href={more}>
            <Button className={classes.more}>More</Button>
          </NextLink>
        )}
      </div>
    </div>
  );
}
