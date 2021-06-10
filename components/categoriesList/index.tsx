import { ButtonBase, Card, CardContent, Typography } from "@material-ui/core";
import NextLink from "next/link";
import classes from "./style.module.css";

export default function CategoriesList({
  categories,
}: {
  categories: {
    name: string;
    icon: JSX.Element;
    href: string;
  }[];
}) {
  return (
    <div className={classes.container}>
      {categories.map((category) => (
        <Card
          key={category.name}
          className={`${classes.cardOuter} elevateOnHover`}
        >
          <NextLink href={category.href} passHref>
            <ButtonBase>
              <CardContent className={classes.cardInner}>
                {category.icon}
                <Typography
                  variant="h6"
                  className={`${classes.text} MuiLink-root MuiLink-underlineHover`}
                >
                  {category.name}
                </Typography>
              </CardContent>
            </ButtonBase>
          </NextLink>
        </Card>
      ))}
    </div>
  );
}
