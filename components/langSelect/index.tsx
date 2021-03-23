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
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";
import classes from "./style.module.css";

const languages: { name: string; locale: string; icon: string }[] = [
  {
    name: "English",
    locale: "en",
    icon: "GB",
  },
  {
    name: "Español",
    locale: "es",
    icon: "MX",
  },
  {
    name: "Deutsch",
    locale: "de",
    icon: "DE",
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
            <ListItemIcon>
              <ReactCountryFlag
                style={{ width: 30, height: 20 }}
                countryCode={language.icon}
                svg
              />
            </ListItemIcon>
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
