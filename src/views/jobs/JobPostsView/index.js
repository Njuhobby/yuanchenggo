import React, { useEffect } from "react";
import clsx from "clsx";
import { Container, Grid } from "@material-ui/core";
import Page from "src/components/Page";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import JobPostCard from "./JobPostCard";
import { getJobPosts } from "src/redux/slices/jobs";

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
}));

//----------------------------------------------------------

function JobPostsView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(getJobPosts());
  }, [dispatch]);

  return (
    <Page title="" className={classes.root}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {jobs.map((item, index) => (
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
      </Container>
    </Page>
  );
}
export default JobPostsView;
