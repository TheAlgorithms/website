import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import LanguagesList from "components/languagesList";
import { Algorithm } from "lib/models";
import { Language, Repositories } from "lib/repositories";
import classes from "./style.module.css";

export default function AddImplementation({
  algorithm,
  open,
  onClose,
}: {
  algorithm: Algorithm;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle className={classes.title}>
        Add another implementation
      </DialogTitle>
      <DialogContent>
        <Typography className={classes.paragraph}>
          To add a implementation in another language, please visit the
          repository for that language and follow the instructions given in the{" "}
          <code>README.md</code> and <code>CONTRIBUTING.md</code>.
        </Typography>
        <Typography className={classes.paragraph}>
          Here are the links to repositories still missing implementations:
        </Typography>
        <LanguagesList
          languages={Object.keys(Repositories)
            .filter(
              (langName) =>
                !Object.keys(algorithm.implementations).includes(langName)
            )
            .map((langName: Language) => ({
              name: langName,
              href: `https://github.com/TheAlgorithms/${langName}`,
            }))}
          outlined
        />
      </DialogContent>
    </Dialog>
  );
}
