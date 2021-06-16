import { Avatar as MuiAvatar, Tooltip, Typography } from "@material-ui/core";
import { Algorithm, Contributor } from "lib/models";
import { useState } from "react";
import ContributorsDialog from "./dialog";
import classes from "./style.module.css";

function Avatar({ contributor }: { contributor: Contributor }) {
  return (
    <MuiAvatar className={classes.avatar} src={contributor.avatar || ""}>
      {!contributor.avatar && contributor.name.slice(0, 1)}
    </MuiAvatar>
  );
}

export default function Contributors({ algorithm }: { algorithm: Algorithm }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className={classes.container}>
      <div className={classes.avatarGroup}>
        {algorithm.contributors
          .slice(algorithm.contributors.length - 15)
          .map((contributor) => (
            <Tooltip key={contributor.email} title={contributor.name}>
              <div>
                {contributor.login ? (
                  <a href={`https://github.com/${contributor.login}`}>
                    <Avatar contributor={contributor} />
                  </a>
                ) : (
                  <Avatar contributor={contributor} />
                )}
              </div>
            </Tooltip>
          ))}
      </div>
      {algorithm.contributors.length > 15 && (
        <Typography
          variant="caption"
          className={classes.more}
          onClick={() => {
            setDialogOpen(true);
          }}
        >
          and {algorithm.contributors.length - 15} more contributors
        </Typography>
      )}
      <ContributorsDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        algorithm={algorithm}
      />
    </div>
  );
}
