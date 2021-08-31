import {
  List,
  Paper,
  ListItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  IconButton,
} from "@material-ui/core";
import { Sort, Star } from "@material-ui/icons";
import LanguageIcon from "components/icon";
import { Language } from "lib/repositories";
import Link from "next/link";
import { useState } from "react";
import classes from "./style.module.css";

interface LanguageProp {
  name: Language;
  href: string;
  stars?: number;
}

export default function LanguagesList({
  languages,
  sortable = false,
}: {
  languages: LanguageProp[];
  sortable?: boolean;
}) {
  const [reverse, setReverse] = useState(false);
  const small = useMediaQuery("(max-width: 900px)");
  const stars = (language: LanguageProp) =>
    language.stars && language.stars < 10000
      ? language.stars.toString()
      : `${Math.floor(language.stars / 1000)}k`;

  return (
    <div className={classes.container}>
      {sortable && (
        <IconButton
          className={reverse ? classes.sortReverse : classes.sort}
          onClick={() => setReverse((r) => !r)}
        >
          <Sort />
        </IconButton>
      )}
      <List component={Paper} className={classes.list}>
        {languages
          .sort((a, b) => (reverse ? a.stars - b.stars : b.stars - a.stars))
          .map((language) => (
            <Link key={language.name} href={language.href} passHref>
              <a className={classes.a}>
                <ListItem button>
                  <ListItemIcon>
                    <LanguageIcon language={language.name} />
                  </ListItemIcon>
                  <ListItemText
                    secondary={
                      small &&
                      language.stars && (
                        <>
                          <Star fontSize="small" />
                          {stars(language)}
                        </>
                      )
                    }
                  >
                    <span className={classes.disabled}>TheAlgorithms / </span>
                    {language.name}
                  </ListItemText>
                  {!small && language.stars && (
                    <ListItemText className={classes.stars}>
                      <Star fontSize="small" />
                      {stars(language)}
                    </ListItemText>
                  )}
                </ListItem>
              </a>
            </Link>
          ))}
      </List>
    </div>
  );
}
