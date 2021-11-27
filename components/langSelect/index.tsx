import {
  Dialog,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@material-ui/core";
import React from "react";
import { useRouter } from "next/router";
import classes from "./style.module.css";

const languages: { name: string; locale: string; icon: string }[] = [
  {
    name: "Deutsch",
    locale: "de",
    icon: "de",
  },
  {
    name: "English",
    locale: "en",
    icon: "gb",
  },
  {
    name: "Esperanto",
    locale: "eo",
    icon: "eo",
  },
  {
    name: "Español",
    locale: "es",
    icon: "mx",
  },
  // {
  //   name: "Hindi",
  //   locale: "hi",
  //   icon: "india",
  // },
  {
    name: "Hrvatski",
    locale: "hr",
    icon: "hr",
  },
  {
    name: "Italiano",
    locale: "it",
    icon: "it",
  },
  {
    name: "Malayalam",
    locale: "ml",
    icon: "india",
  },
  {
    name: "Ukrainian",
    locale: "uk",
    icon: "uk",
  },
  {
    name: "中文(简体)",
    locale: "zh_Hans",
    icon: "zh",
  },
];

function MenuContent() {
  const router = useRouter();

  return (
    <>
      {languages.map((language) => (
        <MenuItem
          key={language.locale}
          selected={router.locale === language.locale}
          onClick={() => {
            router.push(
              {
                pathname: router.pathname,
                query: router.query,
              },
              undefined,
              { locale: language.locale }
            );
          }}
        >
          <ListItemIcon>
            <img
              src={`/flags/${language.icon}.svg`}
              alt={language.icon}
              className={classes.icon}
            />
          </ListItemIcon>
          <ListItemText>{language.name}</ListItemText>
        </MenuItem>
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
