import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import LanguagesList from "components/languagesList";
import Translation from "components/translation";
import useTranslation from "hooks/translation";
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
  const t = useTranslation();
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle className={classes.title}>
        {t("addImplementation")}
      </DialogTitle>
      <DialogContent>
        <Typography className={classes.paragraph}>
          <Translation name="addImplementationInfo" />
        </Typography>
        <Typography className={classes.paragraph}>
          {t("addImplementationMissing")}
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
        />
      </DialogContent>
    </Dialog>
  );
}
