import React from "react";
import PropTypes from "prop-types";
import useAuth from "src/hooks/useAuth";
import { MAvatar } from "src/theme";
import createAvatar from "src/utils/createAvatar";

// ----------------------------------------------------------------------

MyAvatar.propTypes = {
  className: PropTypes.string,
};

function MyAvatar({ className, ...other }) {
  const { user } = useAuth();

  return (
    <MAvatar
      src={user.avatarUrl}
      alt={user.userName}
      color={user.avatarUrl ? "default" : createAvatar(user.userName).color}
      className={className}
      {...other}
    >
      {createAvatar(user.userName).name}
    </MAvatar>
  );
}

export default MyAvatar;
