import React, { useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import Page from "src/components/Page";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import JobPostCard from "./JobPostCard";

//----------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
}));

//----------------------------------------------------------

function JobPostsView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { jobs } = useSelector((state) => state.jobs);

  return (
    <Page title="" className={classes.root}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {jobs.map((item, index) => (
            <JobPostCard job={item} />
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
export default JobPostsView;
