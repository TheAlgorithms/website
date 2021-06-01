import {
  List,
  Paper,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import { Star } from "@material-ui/icons";
import LanguageIcon from "components/icon";
import { Language } from "lib/repositories";
import Link from "next/link";
import classes from "./style.module.css";

export default function LanguagesList({
  languages,
}: {
  languages: {
    name: Language;
    href: string;
    stars?: number;
  }[];
}) {
  return (
    <List component={Paper} className={classes.container}>
      {languages.map((language) => (
        <Link key={language.name} href={language.href} passHref>
          <a className={classes.a}>
            <ListItem button>
              <ListItemIcon>
                <LanguageIcon language={language.name} />
              </ListItemIcon>
              <ListItemText>
                <span className={classes.disabled}>TheAlgorithms / </span>
                {language.name}
              </ListItemText>
              {language.stars && (
                <ListItemText className={classes.stars}>
                  <Star fontSize="small" />
                  {language.stars}
                </ListItemText>
              )}
            </ListItem>
          </a>
        </Link>
      ))}
    </List>
  );
}
