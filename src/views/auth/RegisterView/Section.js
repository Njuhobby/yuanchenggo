import clsx from "clsx";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography } from "@material-ui/core";

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 464,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: theme.spacing(2, 0, 2, 2),
  },
}));

// ----------------------------------------------------------------------

function Section({ className }) {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)}>
      <img
        alt="register"
        src="/static/illustrations/illustration_register.svg"
      />
    </Card>
  );
}

export default Section;
