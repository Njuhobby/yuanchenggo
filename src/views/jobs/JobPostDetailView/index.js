import React, { useEffect, useState } from "react";
import { Card, Container, Box, Typography, Grid } from "@material-ui/core";
import Page from "src/components/Page";
import { format } from "date-fns";
import { InlineIcon, Icon } from "@iconify/react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { getJobPost } from "src/redux/slices/job";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {},
  section: {},
  backToPostsSection: {
    marginBottom: 50,
    color: theme.palette.primary.main,
  },
  createdAt: {
    color: theme.palette.text.secondary,
  },
}));

function JobPostDetailView(props) {
  const { id } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { job, isLoading } = useSelector((state) => state.job);

  const hide = !job.id || job.id !== parseInt(id) || isLoading;

  useEffect(() => {
    if (!job.id || job.id !== parseInt(id)) {
      dispatch(getJobPost(id));
    }
  }, [dispatch]);

  return (
    <Page title="" className={classes.root}>
      <Container maxWidth="lg" className={classes.section}>
        <Box className={classes.backToPostsSection}>
          <Typography variant="body2">
            <InlineIcon icon="bx:bxs-left-arrow-square" /> 返回所有职位
          </Typography>
        </Box>

        {hide ? (
          <Typography variant="body2">Hiding</Typography>
        ) : (
          <Grid container sx={{ width: "100%" }}>
            <Grid item xs={9}>
              <Typography variant="body2" className={classes.createdAt}>
                创建于 {format(new Date(job.createdAt), "yyyy-MM-dd")}
              </Typography>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        )}
      </Container>
    </Page>
  );
}

export default JobPostDetailView;
