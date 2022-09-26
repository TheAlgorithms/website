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
import locales from "lib/locales";
import { i18n } from "next-i18next";
import { Warning } from "@material-ui/icons";
import classes from "./style.module.css";

function MenuContent() {
  const router = useRouter();

  return (
    <>
      {locales
        .filter((locale) => i18n.languages.includes(locale.code))
        .map((locale) => (
          <MenuItem
            key={locale.code}
            selected={router.locale === locale.code}
            onClick={() => {
              router.push(
                {
                  pathname: router.pathname,
                  query: router.query,
                },
                undefined,
                { locale: locale.code }
              );
            }}
          >
            <ListItemIcon>
              <img
                src={`/flags/${locale.icon}.svg`}
                alt={locale.icon}
                className={classes.icon}
              />
            </ListItemIcon>
            <ListItemText>{locale.name}</ListItemText>
          </MenuItem>
        ))}
      {i18n.languages.length <= 1 && (
        <MenuItem disabled>
          <ListItemIcon>
            <Warning />
          </ListItemIcon>
          <ListItemText>
            Localization is disabled on Preview Deployments
          </ListItemText>
        </MenuItem>
      )}
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
