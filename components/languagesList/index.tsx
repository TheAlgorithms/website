import { ButtonBase, Typography } from "@material-ui/core";
import NextLink from "next/link";
import { Language, getLanguageName } from "../../lib/models";
import LanguageIcon from "../icon";
import classes from "./style.module.css";

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
      {languages.map((language) => (
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
      ))}
    </div>
  );
}
