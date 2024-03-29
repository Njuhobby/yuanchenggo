import clsx from "clsx";
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 464,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: theme.spacing(2, 0, 2, 2),
  },
}));

// ----------------------------------------------------------------------

Section.propTypes = {
  className: PropTypes.string,
};

function Section({ className }) {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)}>
      <img src="/static/illustrations/illustration_login.svg" alt="login" />
    </Card>
  );
}

export default Section;
