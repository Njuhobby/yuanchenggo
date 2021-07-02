import React from "react";
import * as Yup from "yup";
import Section from "./Section";
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import Page from "src/components/Page";
import Logo from "src/components/Logo";
import { useSnackbar } from "notistack";
import useAuth from "src/hooks/useAuth";
import RegisterForm from "./RegisterForm";
import { PATH_PAGE } from "src/routes/paths";
import closeFill from "@iconify-icons/eva/close-fill";
import { Link as RouterLink } from "react-router-dom";
import useIsMountedRef from "src/hooks/useIsMountedRef";
import SocialLogin from "src/views/auth/LoginView/SocialLogin";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Link,
  Container,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { MIconButton } from "src/theme";

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  header: {
    top: 0,
    zIndex: 9,
    lineHeight: 0,
    width: "100%",
    display: "flex",
    alignItems: "center",
    position: "absolute",
    padding: theme.spacing(3),
    justifyContent: "space-between",
    [theme.breakpoints.up("md")]: {
      alignItems: "flex-start",
      padding: theme.spacing(7, 5, 0, 7),
    },
  },
  content: {
    maxWidth: 480,
    margin: "auto",
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(12, 0),
  },
}));

// ----------------------------------------------------------------------

function RegisterView() {
  const classes = useStyles();
  const { method, register } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const smDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const RegisterSchema = Yup.object().shape({
    userName: Yup.string()
      .min(2, "太短了!")
      .max(50, "太长了!")
      .required("请输入您的称呼"),
    email: Yup.string()
      .email("请输入合法的电子邮箱地址")
      .required("请输入您的电邮地址"),
    password: Yup.string().required("请输入您的密码"),
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      role: "normal",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await register({
          email: values.email,
          password: values.password,
          userName: values.userName,
        });
        enqueueSnackbar("登录成功", {
          variant: "成功",
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          ),
        });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        console.error(error);
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code || error.message });
          setSubmitting(false);
        }
      }
    },
  });

  return (
    <Page title="注册 | 远程狗" className={classes.root}>
      <header className={classes.header}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        {smDown ? null : (
          <Typography variant="body2" sx={{ mt: { md: -2 } }}>
            已经注册? &nbsp;
            <Link
              underline="none"
              variant="subtitle2"
              component={RouterLink}
              to={PATH_PAGE.auth.login}
            >
              立即登录
            </Link>
          </Typography>
        )}
      </header>

      {mdDown ? null : <Section />}

      <Container>
        <div className={classes.content}>
          <Box sx={{ mb: 5, display: "flex", alignItems: "center" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                加入远程狗的大家庭
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                只工作，不上班，随时随地遇到朋友
              </Typography>
            </Box>
            <Box
              component="img"
              src={`/static/icons/${
                method === "firebase" ? "ic_firebase" : "ic_jwt"
              }.png`}
              sx={{ width: 32, height: 32 }}
            />
          </Box>

          {method === "firebase" && <SocialLogin />}

          <RegisterForm formik={formik} />

          <Typography
            variant="body2"
            align="center"
            sx={{ color: "text.secondary", mt: 3 }}
          >
            点击注册，意味着我同意遵守远程狗的&nbsp;
            <Link underline="always" sx={{ color: "text.primary" }}>
              社区规范
            </Link>
            &nbsp;以及&nbsp;
            <Link underline="always" sx={{ color: "text.primary" }}>
              隐私政策
            </Link>
            .
          </Typography>

          {smUp ? null : (
            <Box sx={{ mt: 3, textAlign: "center" }}>
              已经注册?&nbsp;
              <Link
                variant="subtitle2"
                to={PATH_PAGE.auth.login}
                component={RouterLink}
              >
                立即登录
              </Link>
            </Box>
          )}
        </div>
      </Container>
    </Page>
  );
}

export default RegisterView;
