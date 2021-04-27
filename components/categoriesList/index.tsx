import {
  ButtonBase,
  Card,
  CardContent,
  Link,
  Typography,
} from "@material-ui/core";
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
        <Card key={category.name} className={classes.cardOuter}>
          <NextLink href={category.href} passHref>
            <ButtonBase>
              <CardContent className={classes.cardInner}>
                {category.icon}
                <Typography variant="h6" className={classes.text}>
                  <Link>{category.name}</Link>
                </Typography>
              </CardContent>
            </ButtonBase>
          </NextLink>
        </Card>
      ))}
    </div>
  );
}
