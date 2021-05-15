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
import { useTranslation } from "next-i18next";
import SanitizedHTML from "react-sanitized-html";

export default function AddImplementation({
  algorithm,
  open,
  onClose,
}: {
  algorithm: Algorithm;
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useTranslation("common");
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle className={classes.title}>
        {t("addImplementation")}
      </DialogTitle>
      <DialogContent>
        <Typography className={classes.paragraph}>
          <SanitizedHTML
            allowedTags={["a", "code"]}
            html={t("addImplementationInfo")}
          />
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
          outlined
        />
      </DialogContent>
    </Dialog>
  );
}
