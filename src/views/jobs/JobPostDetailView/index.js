import React, { useEffect } from "react";
import clsx from "clsx";
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
import { MLabel } from "src/theme";
import Page from "src/components/Page";
import { format } from "date-fns";
import { InlineIcon, Icon } from "@iconify/react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { getJobPost } from "src/redux/slices/job";
import { useParams } from "react-router-dom";
import pinFill from "@iconify-icons/eva/pin-fill";
import glowingStar from "@iconify-icons/emojione/glowing-star";
import chevronCircleLeft from "@iconify/icons-fa-solid/chevron-circle-left";
import sadButRelievedFace from "@iconify/icons-openmoji/sad-but-relieved-face";
import parseHtmlToReactOptions from "src/utils/parseHtmlToReactOptions";
import parse from "html-react-parser";
import JobPostCard from "../JobPostsView/JobPostCard";

const useStyles = makeStyles((theme) => ({
  root: {},
  section: {
    display: "flex",
    justifyContent: "space-between",
  },
  arrowsSection: {
    color: theme.palette.primary.main,
  },
  createdAt: {
    color: theme.palette.text.secondary,
  },
  jobTitle: {
    marginTop: theme.spacing(1),
  },
  labelsBox: {
    marginTop: theme.spacing(1),
    display: "flex",
    justifyContent: "",
  },
  label: {
    marginRight: theme.spacing(1),
  },
  companyCard: {
    width: 308,
    height: 400,
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
  companyStar: {
    fontSize: "1.3em",
    position: "relative",
    right: 5,
    top: 2,
  },
  companyName: {
    marginTop: 120,
  },
  reportBox: {
    backgroundColor: "#f8f9fa",
    marginBottom: 80,
    padding: "20px 0px 20px 18px",
    "& p, & h6": {
      marginBottom: 20,
    },
  },
  relatedJobsNotFoundBox: {
    backgroundColor: "#f8f9fa",
    padding: "20px 0px 20px 18px",
  },
  notFoundIcon: {
    fontSize: "2em",
    position: "relative",
    top: 5,
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
  postContentBox: {
    marginTop: 50,
    marginBottom: 70,
    "& ul": {
      paddingLeft: "1.5em",
    },
  },
  jobPostCard: {
    overflow: "visible",
    width: "100%",
    marginBottom: theme.spacing(2),
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
  });

  return (
    <Page title="" className={classes.root}>
      <Container maxWidth="lg">
        <Box
          className={clsx(classes.arrowsSection, classes.section)}
          sx={{ marginBottom: 6 }}
        >
          <Typography variant="body2">
            <InlineIcon icon={chevronCircleLeft} /> 返回所有职位
          </Typography>
          <Typography variant="body2">
            查看该公司其他职位{" "}
            <InlineIcon icon={chevronCircleLeft} rotate="180deg" />
          </Typography>
        </Box>

        {!hide && (
          <Grid container sx={{ width: "100%" }}>
            <Grid item md={8}>
              <Typography variant="body2" className={classes.createdAt}>
                创建于 {format(new Date(job.createdAt), "yyyy-MM-dd")}
              </Typography>
              <Typography variant="h6" className={classes.jobTitle}>
                {job.title}
              </Typography>
              <Box className={classes.labelsBox}>
                <MLabel
                  variant="outlined"
                  color="primary"
                  className={classes.label}
                >
                  {job.location}
                </MLabel>
                <MLabel
                  variant="outlined"
                  color="primary"
                  className={classes.label}
                >
                  {job.salary}
                </MLabel>
                <MLabel
                  variant="outlined"
                  color="primary"
                  className={classes.label}
                >
                  {job.jobCategory}
                </MLabel>
              </Box>
              <Box className={classes.postContentBox}>
                {parse(job.postContent, parseHtmlToReactOptions)}
              </Box>
              <Card className={classes.reportBox}>
                <Typography variant="h6">
                  请帮助我们维护远程狗上发布的职位质量
                </Typography>
                <Typography variant="body2">
                  发现此职位不是远程岗位？
                </Typography>
                <Button variant="contained">立即举报</Button>
              </Card>
              <Box className={classes.section} sx={{ marginBottom: 2 }}>
                <Typography variant="h6">相关职位</Typography>
                <Typography variant="body2" className={classes.arrowsSection}>
                  更多{job.jobCategory}职位{" "}
                  <InlineIcon icon={chevronCircleLeft} rotate="180deg" />
                </Typography>
              </Box>
              {job.relatedJobs && job.relatedJobs.length > 0 ? (
                job.relatedJobs.map((item, index) => (
                  <JobPostCard
                    job={item}
                    height={120}
                    avatarWidth={50}
                    key={`relatedJobs-${index}`}
                    className={classes.jobPostCard}
                  />
                ))
              ) : (
                <Card className={classes.relatedJobsNotFoundBox}>
                  <Typography variant="body2">
                    抱歉，暂时没有找到类似的职位信息。
                    <InlineIcon
                      className={classes.notFoundIcon}
                      icon={sadButRelievedFace}
                    />
                  </Typography>
                </Card>
              )}
            </Grid>
            <Grid item md={4} sx={{ display: "flex", justifyContent: "right" }}>
              <Card className={classes.companyCard}>
                <Avatar
                  alt={job.company.name}
                  src={job.company.avatar}
                  className={classes.companyAvatar}
                />
                {job.company.isStar ? (
                  <Typography variant="h6" className={classes.companyName}>
                    <InlineIcon
                      icon={glowingStar}
                      className={classes.companyStar}
                    />
                    {job.company.name}
                  </Typography>
                ) : (
                  <Typography variant="h6" className={classes.companyName}>
                    {job.company.name}
                  </Typography>
                )}
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
