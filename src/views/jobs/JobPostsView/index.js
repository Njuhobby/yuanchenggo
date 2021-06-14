import React, { useEffect } from "react";
import clsx from "clsx";
import { Container, Grid, Typography } from "@material-ui/core";
import Page from "src/components/Page";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import JobPostCard from "./JobPostCard";
import { getJobPosts } from "src/redux/slices/jobs";
import _ from "lodash";
import { isThisWeek, isThisMonth } from "date-fns";
import { InlineIcon } from "@iconify/react";
import pawIcon from "@iconify-icons/cil/paw";
import boneIcon from "@iconify-icons/noto/bone";
import fireIcon from "@iconify-icons/emojione/fire";

//----------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  jobPostCardWrap: {
    display: "flex",
    justifyContent: "flex-end",
  },
  jobPostCard: {
    overflow: "visible",
    width: "calc(100% - 25px)",
  },
  section: {
    marginBottom: 200,
  },
  sectionHeader: {
    position: "relative",
    left: 24,
  },
  sectionHeaderIcon: {
    fontSize: "1.5em",
    position: "relative",
    left: 15,
  },
}));

//----------------------------------------------------------

function JobPostsView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state.jobs);
  const jobsPostedThisWeek = [];
  const jobsPostedThisMonth = [];
  const jobsPostedEarlier = [];

  _.each(jobs, function (item) {
    if (isThisWeek(Date.parse(item.createdAt))) {
      jobsPostedThisWeek.push(item);
    } else if (isThisMonth(Date.parse(item.createdAt))) {
      jobsPostedThisMonth.push(item);
    } else {
      jobsPostedEarlier.push(item);
    }
  });

  useEffect(() => {
    dispatch(getJobPosts());
  }, [dispatch]);

  return (
    <Page title="" className={classes.root}>
      <Container maxWidth="xl" className={classes.section}>
        {jobsPostedThisWeek.length > 0 && (
          <Grid container spacing={3} className={classes.section}>
            <Typography variant="h5" className={classes.sectionHeader}>
              本周最新发布的职位
              <InlineIcon
                icon={fireIcon}
                className={classes.sectionHeaderIcon}
              />
            </Typography>
            {jobsPostedThisWeek.map((item, index) => (
              <Grid
                key={classes.jobPostCardWrap + index}
                item
                xs={12}
                className={clsx(classes.jobPostCardWrap)}
              >
                <JobPostCard
                  job={item}
                  className={clsx(classes.jobPostCard)}
                  height={120}
                  avatarWidth={50}
                />
              </Grid>
            ))}
          </Grid>
        )}
        {jobsPostedThisMonth.length > 0 && (
          <Grid container spacing={3} className={classes.section}>
            <Typography variant="h5" className={classes.sectionHeader}>
              本月发布的职位
              <InlineIcon
                icon={boneIcon}
                className={classes.sectionHeaderIcon}
              />
            </Typography>

            {jobsPostedThisMonth.map((item, index) => (
              <Grid
                key={classes.jobPostCardWrap + index}
                item
                xs={12}
                className={clsx(classes.jobPostCardWrap)}
              >
                <JobPostCard
                  job={item}
                  className={clsx(classes.jobPostCard)}
                  height={120}
                  avatarWidth={50}
                />
              </Grid>
            ))}
          </Grid>
        )}
        {jobsPostedEarlier.length > 0 && (
          <Grid container spacing={3} className={classes.section}>
            <Typography variant="h5" className={classes.sectionHeader}>
              一个月前发布的职位
              <InlineIcon
                icon={pawIcon}
                className={classes.sectionHeaderIcon}
              />
            </Typography>

            {jobsPostedEarlier.map((item, index) => (
              <Grid
                key={classes.jobPostCardWrap + index}
                item
                xs={12}
                className={clsx(classes.jobPostCardWrap)}
              >
                <JobPostCard
                  job={item}
                  className={clsx(classes.jobPostCard)}
                  height={120}
                  avatarWidth={50}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Page>
  );
}
export default JobPostsView;
