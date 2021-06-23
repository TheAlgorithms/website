import {
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  Icon,
  List,
  ListItem as MuiListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import Translation from "components/translation";
import useTranslation from "hooks/translation";
import { Algorithm, Contributor } from "lib/models";
import React from "react";
import GithubOriginalIcon from "react-devicons/github/original";
import classes from "./style.module.css";

function ListItem({ contributor }: { contributor: Contributor }) {
  const t = useTranslation();

  return (
    // Typescript is broken here
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <MuiListItem button={!!contributor.login}>
      <ListItemAvatar>
        <Avatar src={contributor.avatar || ""}>
          {!contributor.avatar && contributor.name.slice(0, 1)}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={contributor.name}
        secondary={
          contributor.commits === 1
            ? t("contributorsOneCommit")
            : t("contributorsCommits", {
                numberCommits: contributor.commits.toString(),
              })
        }
      />
    </MuiListItem>
  );
}

export default function ContributorsDialog({
  algorithm,
  open,
  onClose,
}: {
  algorithm: Algorithm;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Icon className={classes.icon}>
          <GithubOriginalIcon />
        </Icon>
        <Translation
          name="contributorsTitle"
          variables={{ algorithm: algorithm.name }}
        />
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <List className={classes.list}>
          {algorithm.contributors
            .slice()
            .reverse()
            .map((contributor) => (
              <div key={contributor.email}>
                {contributor.login ? (
                  <a
                    key={contributor.email}
                    href={`https://github.com/${contributor.login}`}
                    style={{ textDecoration: "none", color: "unset" }}
                  >
                    <ListItem contributor={contributor} />
                  </a>
                ) : (
                  <ListItem contributor={contributor} />
                )}
              </div>
            ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}
