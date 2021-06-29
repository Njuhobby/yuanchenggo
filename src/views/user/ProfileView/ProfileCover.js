import clsx from "clsx";
import React from "react";
import PropTypes from "prop-types";
import LazySize from "src/components/LazySize";
import MyAvatar from "src/components/MyAvatar";
import { makeStyles } from "@material-ui/core/styles";

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    /* "&:before": {
      top: 0,
      zIndex: 9,
      width: "100%",
      content: "''",
      height: "100%",
      position: "absolute",
      backdropFilter: "blur(3px)",
      backgroundColor: alpha(theme.palette.primary.darker, 0.72),
    },*/
  },
  userInfo: {
    left: 0,
    right: 0,
    zIndex: 99,
    position: "absolute",
    marginTop: theme.spacing(5),
    [theme.breakpoints.up("md")]: {
      right: "auto",
      display: "flex",
      alignItems: "center",
      left: theme.spacing(3),
      bottom: theme.spacing(3),
    },
  },
}));

// ----------------------------------------------------------------------

ProfileCover.propTypes = {
  myProfile: PropTypes.object,
  authUser: PropTypes.object,
  className: PropTypes.string,
};

function ProfileCover({ myProfile, className }) {
  const classes = useStyles();
  const { cover } = myProfile;

  return (
    <div className={clsx(classes.root, className)}>
      <div className={classes.userInfo}>
        <MyAvatar
          sx={{
            mx: "auto",
            borderWidth: 2,
            borderStyle: "solid",
            borderColor: "common.white",
            width: { xs: 80, md: 128 },
            height: { xs: 80, md: 128 },
          }}
        />
      </div>
      <LazySize
        alt="profile cover"
        src={cover.small}
        size={`${cover.small} 600w, ${cover.medium} 1200w`}
        dataSizes="(max-width: 600px) 600px,
            1200px"
        sx={{ zIndex: 8, height: "100%", position: "absolute" }}
      />
    </div>
  );
}

export default ProfileCover;
