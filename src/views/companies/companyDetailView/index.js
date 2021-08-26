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
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getCompany } from "src/redux/slices/company";

const useStyles = makeStyles((theme) => ({
  root: {
    "& p a:hover": {
      textDecoration: "none",
    },
  },
}));

function CompanyDetailView(props) {
  const { id } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { company } = useSelector((state) => state.company);

  const hide = !company.id || company.id !== parseInt(id);

  useEffect(() => {
    if (hide) {
      dispatch(getCompany(id));
    }
  });

  return (
    <Page title="金主主页" className={classes.root}>
      <Container maxWidth="xl"></Container>
    </Page>
  );
}

export default CompanyDetailView;
