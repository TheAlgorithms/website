import { ButtonBase, Card, CardContent, Typography } from "@material-ui/core";
import NextLink from "next/link";
import { Language, getLanguageName } from "lib/repositories";
import LanguageIcon from "components/icon";
import classes from "./style.module.css";

export default function LanguagesList({
  languages,
  className,
  outlined = false,
}: {
  languages: {
    name: Language;
    href: string;
  }[];
  className?: string;
  outlined?: boolean;
}) {
  return (
    <div className={className || ""}>
      {languages.map((language) => (
        <Card
          variant={outlined ? "outlined" : "elevation"}
          key={getLanguageName(language.name)}
          className={classes.card}
        >
          <NextLink href={language.href} passHref>
            <ButtonBase>
              <CardContent className={classes.cardInner}>
                <LanguageIcon language={language.name} />
                <Typography>{getLanguageName(language.name)}</Typography>
              </CardContent>
            </ButtonBase>
          </NextLink>
        </Card>
      ))}
    </div>
  );
}
