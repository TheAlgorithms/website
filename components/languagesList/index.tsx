import { ButtonBase, Link, Typography } from "@material-ui/core";
import { Language, getLanguageName } from "../../lib/models";
import { normalize } from "../../lib/normalize";
import LanguageIcon from "../icon";
import classes from "./style.module.css";
import NextLink from "next/link";

export default function LanguagesList({
  languages,
}: {
  languages: {
    name: Language;
    href: string;
  }[];
}) {
  return (
    <div className={classes.grid}>
      {languages.map((language) => {
        return (
          <NextLink
            key={getLanguageName(language.name)}
            href={language.href}
            passHref
          >
              <ButtonBase>
                <LanguageIcon language={language.name} />
                <Typography>{getLanguageName(language.name)}</Typography>
              </ButtonBase>
          </NextLink>
        );
      })}
    </div>
  );
}
