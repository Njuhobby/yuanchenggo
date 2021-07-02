import clsx from "clsx";
import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Box, Card, CardContent } from "@material-ui/core";

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    textAlign: "center",
    backgroundColor: theme.palette.primary.lighter,
    [theme.breakpoints.up("md")]: {
      display: "flex",
      textAlign: "left",
      alignItems: "center",
      justifyContent: "space-between",
    },
    [theme.breakpoints.up("xl")]: {
      height: 320,
    },
  },
}));

// ----------------------------------------------------------------------

Welcome.propTypes = {
  userName: PropTypes.string,
  className: PropTypes.string,
};

function Welcome({ userName, className, ...other }) {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 },
        }}
      >
        <Typography gutterBottom variant="h4" sx={{ color: "grey.800" }}>
          欢迎回来，
          <br /> {!userName ? "..." : userName}!
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            pb: { xs: 3, xl: 5 },
          }}
        >
          {
            "远程工作意味着全新、灵活的工作方式，加入远程狗社区探索精彩纷呈的各色内容，让你不再孤单"
          }
        </Typography>

        <Button variant="contained" to="#" component={RouterLink}>
          立即开始
        </Button>
      </CardContent>

      <Box
        component="img"
        alt="welcome"
        src="/static/illustrations/illustration_seo.svg"
        sx={{
          p: 2,
          height: 280,
          margin: { xs: "auto", md: "inherit" },
        }}
      />
    </Card>
  );
}

export default Welcome;
