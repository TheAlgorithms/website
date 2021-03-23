import {
  Dialog,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@material-ui/core";
import React from "react";
import { IconFlagUS, IconFlagES, IconFlagDE } from "material-ui-flags";
import { useRouter } from "next/router";
import Link from "next/link";
import classes from "./style.module.css";

const languages: { name: string; locale: string; Icon: JSX.Element }[] = [
  {
    name: "English",
    locale: "en",
    Icon: <IconFlagUS />,
  },
  {
    name: "Español",
    locale: "es",
    Icon: <IconFlagES />,
  },
  {
    name: "Deutsch",
    locale: "de",
    Icon: <IconFlagDE />,
  },
];

function MenuContent() {
  const router = useRouter();

  return (
    <>
      {languages.map((language) => (
        <Link
          locale={language.locale}
          key={language.locale}
          href={router.route}
          passHref
        >
          <MenuItem selected={router.locale === language.locale}>
            <ListItemIcon>{language.Icon}</ListItemIcon>
            <ListItemText>{language.name}</ListItemText>
          </MenuItem>
        </Link>
      ))}
    </>
  );
}

export default function LangSelect({ open, onClose, anchor }) {
  const smallScreen = useMediaQuery("(max-width:800px)");

  return smallScreen ? (
    <Dialog open={open} onClose={onClose}>
      <MenuContent />
    </Dialog>
  ) : (
    <Menu
      className={classes.menu}
      open={open}
      onClose={onClose}
      anchorEl={anchor}
    >
      <MenuContent />
    </Menu>
  );
}
