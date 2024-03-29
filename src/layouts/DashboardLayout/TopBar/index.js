import clsx from "clsx";
import React from "react";
import Search from "./Search";
import Logout from "./Logout";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import Notifications from "./Notifications";
import Settings from "src/layouts/Common/Settings";
import menu2Fill from "@iconify-icons/eva/menu-2-fill";
import { alpha, makeStyles } from "@material-ui/core/styles";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  useMediaQuery,
} from "@material-ui/core";

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    backdropFilter: "blur(8px)",
    backgroundColor: alpha(theme.palette.background.default, 0.72),
    [theme.breakpoints.up("lg")]: {
      paddingLeft: DRAWER_WIDTH,
    },
  },
  toolbar: {
    minHeight: APPBAR_MOBILE,
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(0, 5),
    },
    [theme.breakpoints.up("lg")]: {
      minHeight: APPBAR_DESKTOP,
    },
  },
}));

// ----------------------------------------------------------------------

TopBar.propTypes = {
  onOpenNav: PropTypes.func,
  className: PropTypes.string,
};

function TopBar({ onOpenNav, className }) {
  const classes = useStyles();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  return (
    <AppBar className={clsx(classes.root, className)}>
      <Toolbar className={classes.toolbar}>
        {lgUp ? null : (
          <IconButton
            onClick={onOpenNav}
            sx={{
              mr: 1,
              color: "text.primary",
            }}
          >
            <Icon icon={menu2Fill} />
          </IconButton>
        )}

        <Search />
        <Box sx={{ flexGrow: 1 }} />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            "& > *:not(:first-of-type)": {
              ml: {
                xs: 0.5,
                sm: 2,
                lg: 3,
              },
            },
          }}
        >
          <Notifications />
          <Settings />
          <Logout />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
