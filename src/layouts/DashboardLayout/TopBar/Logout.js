import React, { useRef, useState } from "react";
import clsx from "clsx";
import PopoverMenu from "src/components/PopoverMenu";
import useAuth from "src/hooks/useAuth";
import { MIconButton } from "src/theme";
import { alpha, makeStyles } from "@material-ui/core/styles";
import { Button, Box, Divider, Typography } from "@material-ui/core";
import { useSnackbar } from "notistack";
import useIsMountedRef from "src/hooks/useIsMountedRef";
import { useHistory } from "react-router-dom";
import { Icon } from "@iconify/react";
import twotoneLogOut from "@iconify-icons/ic/twotone-log-out";

const useStyles = makeStyles((theme) => ({
  btnAvatar: {
    padding: 0,
    width: 44,
    height: 44,
  },
  isSelected: {
    "&:before": {
      zIndex: 1,
      content: "''",
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      position: "absolute",
      background: alpha(theme.palette.grey[900], 0.8),
    },
  },
}));

function Logout() {
  const classes = useStyles();
  const history = useHistory();
  const anchorRef = useRef(null);
  const { user, logout } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      if (isMountedRef.current) {
        history.push("/");
        handleClose();
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Unable to logout", { variant: "error" });
    }
  };

  return (
    <>
      <MIconButton
        ref={anchorRef}
        onClick={handleOpen}
        className={clsx(classes.btnAvatar, { [classes.isSelected]: isOpen })}
      >
        <Icon icon={twotoneLogOut} />
      </MIconButton>
      <PopoverMenu
        width={220}
        open={isOpen}
        onClose={handleClose}
        anchorEl={anchorRef.current}
      >
        <Box sx={{ my: 2, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {user.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            fullWidth
            color="inherit"
            variant="outlined"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </PopoverMenu>
    </>
  );
}

export default Logout;
