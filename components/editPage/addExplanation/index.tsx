import {
  Dialog,
  DialogContent,
  DialogTitle,
  Link,
  Typography,
} from "@material-ui/core";
import classes from "./style.module.css";
import { useTranslation } from "next-i18next";
import SanitizedHTML from "react-sanitized-html";

export default function AddExplanation({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useTranslation("common");
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle className={classes.title}>
        {t("addExplanation")}
      </DialogTitle>
      <DialogContent>
        <Typography className={classes.paragraph}>
          <SanitizedHTML
            allowedTags={["a"]}
            html={t("addExplanationInfo")}
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
