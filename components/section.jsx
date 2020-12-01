import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: "20px",
  },
}));

export default function Section({ title, children }) {
  let classes = useStyles();

  return (
    <div className="section container">
      <Typography variant="h4" className={classes.title}>
        {title}
      </Typography>
      {children}
    </div>
  );
}
