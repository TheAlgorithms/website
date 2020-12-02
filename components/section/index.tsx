import { Typography } from "@material-ui/core";
import classes from "./style.module.css";

export default function Section({ title, children }) {
  return (
    <div className="section container">
      <Typography variant="h4" className={classes.title}>
        {title}
      </Typography>
      {children}
    </div>
  );
}
