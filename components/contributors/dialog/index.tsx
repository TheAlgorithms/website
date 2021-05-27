import {
  Avatar,
  Dialog,
  DialogTitle,
  List,
  ListItem as MuiListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import { Algorithm, Contributor } from "lib/models";

function ListItem({ contributor }: { contributor: Contributor }) {
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
        secondary={`${contributor.commits} commit${
          contributor.commits !== 1 ? "s" : ""
        }`}
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
      <DialogTitle>{algorithm.name} Contributors</DialogTitle>
      <List style={{ flexDirection: "column-reverse" }}>
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
    </Dialog>
  );
}
