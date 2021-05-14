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

export default function AddTranslation({
  algorithm,
  open,
  onClose,
}: {
  algorithm: Algorithm;
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle className={classes.title}>
        <Translate className={classes.icon} /> Translate this explanation
      </DialogTitle>
      <DialogContent>
        <Typography className={classes.paragraph}>
          To translate this explanation, please visit the{" "}
          <Link href="https://github.com/TheAlgorithms/Algorithms-Explanation">
            Algorithms-Explanation
          </Link>{" "}
          repositoriy. Fork this repositoriy and add your translation as a new
          markdown file based on the english{" "}
          <Link href={algorithm.explanationUrl.en}>
            <code>{algorithm.explanationUrl.en.split("/").pop()}</code>
          </Link>{" "}
          in the correct folder for your locale (<code>{router.locale}</code>).
          When you have translated the file, you can create a new pull request
          to merge your translation.
        </Typography>
        <Typography className={classes.paragraph}>
          If you have any issues, feel free to go on our{" "}
          <Link href="https://discord.gg/c7MnfGFGa6">Discord</Link> and ask for
          help.
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
