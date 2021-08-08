import React, { useEffect } from "react";
import {
  Card,
  Avatar,
  Container,
  Button,
  Box,
  Typography,
  Link,
  Grid,
} from "@material-ui/core";
import Page from "src/components/Page";
import { format } from "date-fns";
import { InlineIcon, Icon } from "@iconify/react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { getJobPost } from "src/redux/slices/job";
import { useParams } from "react-router-dom";
import pinFill from "@iconify-icons/eva/pin-fill";

const useStyles = makeStyles((theme) => ({
  root: {},
  section: {},
  arrowsSection: {
    marginBottom: 50,
    color: theme.palette.primary.main,
    display: "flex",
    justifyContent: "space-between",
  },
  createdAt: {
    color: theme.palette.text.secondary,
  },
  companyCard: {
    padding: 40,
    backgroundColor: "#f8f9fa",
    textAlign: "center",
    position: "relative",
  },
  companyAvatar: {
    position: "absolute",
    width: 100,
    height: 100,
    left: "50%",
    transform: "translate(-50%,0)",
  },
  companyName: {
    marginTop: 120,
  },
  icon: {
    width: 20,
    height: 20,
    position: "relative",
    top: 3,
    marginRight: theme.spacing(1),
  },
  applyButton: {
    marginTop: 40,
    height: 50,
    width: 200,
  },
}));

function JobPostDetailView(props) {
  const { id } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { job, isLoading } = useSelector((state) => state.job);

  const hide = !job.id || job.id !== parseInt(id) || isLoading;
  console.log(job.company);

  useEffect(() => {
    if (!job.id || job.id !== parseInt(id)) {
      dispatch(getJobPost(id));
    }
  }, [dispatch]);

  return (
    <Page title="" className={classes.root}>
      <Container maxWidth="lg" className={classes.section}>
        <Box className={classes.arrowsSection}>
          <Typography variant="body2">
            <InlineIcon icon="bx:bxs-left-arrow-square" /> 返回所有职位
          </Typography>
          <Typography variant="body2">
            查看其他相关职位{" "}
            <InlineIcon icon="bx:bxs-left-arrow-square" rotate="180deg" />
          </Typography>
        </Box>

        {!hide && (
          <Grid container sx={{ width: "100%" }}>
            <Grid item xs={9}>
              <Typography variant="body2" className={classes.createdAt}>
                创建于 {format(new Date(job.createdAt), "yyyy-MM-dd")}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Card className={classes.companyCard}>
                <Avatar
                  alt={job.company.name}
                  src={job.company.avatar}
                  className={classes.companyAvatar}
                />
                <Typography variant="h6" className={classes.companyName}>
                  {job.company.name}
                </Typography>
                <div>
                  <Icon icon={pinFill} className={classes.icon} />
                  <Typography variant="subtitle">
                    {job.company.country} - {job.company.city}
                  </Typography>
                </div>
                <div>
                  <Icon icon="eva:home-fill" className={classes.icon} />
                  <Link
                    href={job.company.websiteUrl}
                    color="inherit"
                    variant="subtitle"
                  >
                    前去官网
                  </Link>
                </div>
                <Button
                  variant="contained"
                  color="error"
                  className={classes.applyButton}
                >
                  立即申请
                </Button>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </Page>
  );
}

export default JobPostDetailView;
