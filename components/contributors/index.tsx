import { Tooltip } from "@material-ui/core";
import { Contributor } from "lib/models";
import classes from "./style.module.css";

export default function Contributors({
  contributors,
}: {
  contributors: Contributor[];
}) {
  return (
    <div>
      {contributors.map((contributor) => (
        <Tooltip key={contributor.email} title={contributor.name}>
          {contributor.login ? (
            <a href={`https://github.com/${contributor.login}`}>
              <img
                className={classes.avatar}
                src={contributor.avatar}
                alt="Avatar"
              />
            </a>
          ) : (
            <img
              className={classes.avatar}
              src={contributor.avatar}
              alt="Avatar"
            />
          )}
        </Tooltip>
      ))}
    </div>
  );
}
