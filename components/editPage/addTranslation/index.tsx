import {
  Dialog,
  DialogContent,
  DialogTitle,
  Link,
  Typography,
} from "@material-ui/core";
import { Translate } from "@material-ui/icons";
import { Algorithm } from "lib/models";
import { useRouter } from "next/router";
import classes from "./style.module.css";
import { useTranslation } from "next-i18next";
import SanitizedHTML from "react-sanitized-html";

export default function AddTranslation({
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
        <Translate className={classes.icon} /> {t("addTranslation")}
      </DialogTitle>
      <DialogContent>
        <Typography className={classes.paragraph}>
          <SanitizedHTML
            allowedTags={["a", "code"]}
            html={t("addTranslation")}
          />
        </Typography>
        <Typography className={classes.paragraph}>
          <SanitizedHTML
            allowedTags={["a"]}
            html={t("editPageHelp")}
          />
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
