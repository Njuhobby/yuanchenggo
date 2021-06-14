import clsx from "clsx";
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import createAvatar from "src/utils/createAvatar";
import { getJobPosts } from "src/redux/slices/jobs";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  companyAvatar: {
    position: "absolute",
    left: 0,
    transform: "translate(-50%, -50%)",
    border: "solid 1px black",
  },
}));

JobPostCard.propTypes = {
  job: PropTypes.object,
  className: PropTypes.string,
  height: PropTypes.number,
  avatarWidth: PropTypes.number,
};

function JobPostCard({ job, className, height, avatarWidth }) {
  const classes = useStyles();
  return (
    <Card className={clsx(classes.root, className)} sx={{ height: height }}>
      <Avatar
        alt={job.company.name}
        src={job.company.avatar}
        className={clsx(classes.companyAvatar)}
        sx={{ top: height / 2, width: avatarWidth, height: avatarWidth }}
      />
    </Card>
  );
}

export default JobPostCard;
