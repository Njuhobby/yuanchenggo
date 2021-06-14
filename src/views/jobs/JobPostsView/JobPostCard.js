import clsx from "clsx";
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Avatar, Grid, Typography } from "@material-ui/core";

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
    <Card
      className={clsx(classes.root, className)}
      sx={{ height: height, paddingLeft: avatarWidth / 8 }}
    >
      <Avatar
        alt={job.company.name}
        src={job.company.avatar}
        className={clsx(classes.companyAvatar)}
        sx={{ top: height / 2, width: avatarWidth, height: avatarWidth }}
      />
      <Grid container sx={{ justifyContent: "space-between", width: "100%" }}>
        <Grid item>
          <Typography variant="body2" sx={{ mt: "15px" }}>
            {job.company.name}
          </Typography>
          <Typography variant="h6" sx={{ mt: "10px" }}>
            {job.title}
          </Typography>
          <Typography variant="body2" sx={{ mt: "10px" }}>
            {job.location}
          </Typography>
        </Grid>
        <Grid item></Grid>
      </Grid>
    </Card>
  );
}

export default JobPostCard;
