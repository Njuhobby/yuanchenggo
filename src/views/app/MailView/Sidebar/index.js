import clsx from "clsx";
import LabelItem from "./LabelItem";
import { Icon } from "@iconify/react";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Scrollbars from "src/components/Scrollbars";
import plusFill from "@iconify-icons/eva/plus-fill";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar, openCompose } from "src/redux/slices/mail";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  List,
  Drawer,
  Button,
  Divider,
  useMediaQuery,
} from "@material-ui/core";

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
  root: {},
  drawerPaper: {
    width: 280,
  },
  drawerPaperDesktop: {
    position: "relative",
  },
}));

function Sidebar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { labels, isOpenSidebar } = useSelector((state) => state.mail);
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down("md"));

  useEffect(() => {
    if (isOpenSidebar) {
      dispatch(closeSidebar());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };

  const handleOpenCompose = () => {
    handleCloseSidebar();
    dispatch(openCompose());
  };

  const renderContent = (
    <Scrollbars>
      <Box sx={{ p: 3 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<Icon icon={plusFill} />}
          onClick={handleOpenCompose}
        >
          Compose
        </Button>
      </Box>

      <Divider />

      <List disablePadding>
        {labels.map((label) => (
          <LabelItem key={label.id} label={label} />
        ))}
      </List>
    </Scrollbars>
  );

  return (
    <>
      {mdUp ? null : (
        <Drawer
          variant="temporary"
          open={isOpenSidebar}
          onClose={handleCloseSidebar}
          classes={{ paper: classes.drawerPaper }}
          ModalProps={{ keepMounted: true }}
        >
          {renderContent}
        </Drawer>
      )}

      {mdDown ? null : (
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, classes.drawerPaperDesktop),
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  );
}

export default Sidebar;
