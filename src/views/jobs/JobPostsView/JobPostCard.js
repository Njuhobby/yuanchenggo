import clsx from "clsx";
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Avatar, Grid, Typography, Box } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { format, differenceInDays } from "date-fns";
import { Icon, InlineIcon } from "@iconify/react";
import glowingStar from "@iconify-icons/emojione/glowing-star";
import heartOutlined from "@iconify-icons/ant-design/heart-outlined";
import heartFilled from "@iconify-icons/ant-design/heart-filled";

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
  heart: {
    position: "absolute",
    fontSize: "2em",
  },
  filledHeart: {
    position: "absolute",
    fontSize: "2em",
    color: theme.palette.error.main,
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
        sx={{ top: height / 2, width: avatarWidth }}
      />
      <Grid container sx={{ width: "100%" }}>
        <Grid item xs={8} sx={{ display: "flex" }}>
          <Grid item xs={8}>
            {job.company.isStar ? (
              <Typography variant="body2" sx={{ mt: "15px" }}>
                {job.company.name}
                <InlineIcon
                  icon={glowingStar}
                  className={classes.companyStar}
                />
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
          <Grid item xs={2}>
            {job.saved ? (
              <Icon
                className={clsx(classes.filledHeart)}
                style={{ top: height / 2, transform: "translate(0, -50%)" }}
                icon={heartFilled}
              />
            ) : (
              <Icon
                className={clsx(classes.heart)}
                style={{ top: height / 2, transform: "translate(0, -50%)" }}
                icon={heartOutlined}
              />
            )}
          </Grid>
          <Grid item xs={2}>
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
        </Grid>
        <Grid
          item
          xs={4}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          {differenceInDays(new Date(), Date.parse(job.createdAt)) <= 3 ? (
            <Grid item xs={6} sx={{ position: "relative" }}>
              <Box
                sx={{
                  position: "absolute",
                  top: height / 2,
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  bgcolor: theme.palette.warning.main,
                  textAlign: "center",
                  borderRadius: "3px",
                  padding: "6px 8px 3px 8px",
                  color: "#4d5154",
                }}
              >
                <Typography variant="subtitle2">NEW</Typography>
              </Box>
            </Grid>
          ) : (
            <Grid item xs={6} />
          )}
          <Grid item>
            <Box
              className={classes.rightmostBar}
              sx={{
                height: height - 20,
              }}
            ></Box>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

export default JobPostCard;
