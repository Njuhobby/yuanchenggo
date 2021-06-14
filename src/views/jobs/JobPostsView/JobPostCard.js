import clsx from "clsx";
import React from "react";
import PropTypes from "prop-types";
import { alpha, makeStyles } from "@material-ui/core/styles";
import { Card, Avatar, Grid, Typography, Box } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { format } from "date-fns";
import { InlineIcon } from "@iconify/react";
import glowingStar from "@iconify-icons/emojione/glowing-star";

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
  rightmostBar: {
    width: 5,
    borderRadius: 20,
    backgroundColor: theme.palette.primary.main,
    position: "relative",
    right: 5,
    top: 10,
  },
  companyStar: {
    fontSize: "1.3em",
    position: "relative",
    left: 5,
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
  const theme = useTheme();

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
        <Grid item xs={6}>
          {job.company.isStar ? (
            <Typography variant="body2" sx={{ mt: "15px" }}>
              {job.company.name}
              <InlineIcon icon={glowingStar} className={classes.companyStar} />
            </Typography>
          ) : (
            <Typography variant="body2" sx={{ mt: "15px" }}>
              {job.company.name}
            </Typography>
          )}
          <Typography variant="h6" sx={{ mt: "10px" }}>
            {job.title}
          </Typography>
          <Typography variant="body2" sx={{ mt: "10px" }}>
            {job.location}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
              position: "absolute",
              top: height / 2,
              transform: "translate(0, -50%)",
            }}
          >
            {format(Date.parse(job.createdAt), "yyyy-MM")}
          </Typography>
        </Grid>
        <Grid item>
          <Box
            className={classes.rightmostBar}
            sx={{
              height: height - 20,
            }}
          ></Box>
        </Grid>
      </Grid>
    </Card>
  );
}

export default JobPostCard;
