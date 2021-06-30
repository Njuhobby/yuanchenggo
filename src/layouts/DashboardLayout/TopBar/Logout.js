import React from "react";
import clsx from "clsx";
import useAuth from "src/hooks/useAuth";
import { MIconButton } from "src/theme";
import { makeStyles } from "@material-ui/core/styles";
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
}));

function Logout() {
  const classes = useStyles();
  const history = useHistory();
  const { logout } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = async () => {
    try {
      await logout();
      if (isMountedRef.current) {
        history.push("/");
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Unable to logout", { variant: "error" });
    }
  };

  return (
    <MIconButton onClick={handleLogout} className={clsx(classes.btnAvatar)}>
      <Icon icon={twotoneLogOut} />
    </MIconButton>
  );
}

export default Logout;
