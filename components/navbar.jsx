import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  useScrollTrigger,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from "./link";
import React from "react";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    transition: "background 0.2s ease, border-color 0.2s ease",
  },
  toolbar: {
    padding: 0,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: "white",
    cursor: "pointer",
  },
}));

export default function Navbar() {
  const router = useRouter();
  let classes = useStyles();
  const [isTop, setIsTop] = useState(true);
  useEffect(() => {
    document.addEventListener("scroll", (e) => {
      let scrolled = document.scrollingElement.scrollTop;
      if (scrolled >= 5) {
        setIsTop(false);
      } else {
        setIsTop(true);
      }
    });
  }, []);

  return (
    <AppBar
      style={{
        background: isTop
          ? "rgba(0,0,0,0)"
          : "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/programming-1873854_1920.png)",
        borderColor: isTop ? "rgba(0,0,0,0)" : undefined,
      }}
      className={classes.root}
    >
      <Toolbar className={classes.toolbar + " container"}>
        <Typography variant="h6" className={classes.title}>
          <Link href="/" style={{ color: "white" }}>
            TheAlgorithms
          </Link>
        </Typography>
        <Button
          color="inherit"
          href="https://github.com/TheAlgorithms/"
          target="_blank"
        >
          GitHub
        </Button>
      </Toolbar>
    </AppBar>
  );
}
