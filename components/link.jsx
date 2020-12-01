import { Link as MuiLink } from "@material-ui/core";
import NextLink from "next/link";

export default function Link({ href, children, className = "", style = {} }) {
  return (
    <NextLink href={href} passHref>
      <MuiLink className={className} style={style}>
        {children}
      </MuiLink>
    </NextLink>
  );
}
