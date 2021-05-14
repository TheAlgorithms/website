import {
  Dialog,
  DialogContent,
  DialogTitle,
  Link,
  Typography,
} from "@material-ui/core";
import classes from "./style.module.css";

export default function AddExplanation({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle className={classes.title}>
        Add an explanation for this algorithm
      </DialogTitle>
      <DialogContent>
        <Typography className={classes.paragraph}>
          This algorithm does not yet have a explanation. The explanations are
          located in the{" "}
          <Link href="https://github.com/TheAlgorithms/Algorithms-Explanation">
            Algorithms-Explanation
          </Link>{" "}
          repository. If you want to add an explanation, fork this repository
          and add the explanation as a markdown file (
          <Link href="https://github.com/TheAlgorithms/Algorithms-Explanation/blob/master/en/Sorting%20Algorithms/Quick%20Sort.md">
            example
          </Link>
          ). Once you are finished, you can open a pull request to merge your
          explanation.
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
