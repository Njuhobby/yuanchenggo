import React from "react";
import * as Yup from "yup";
import Section from "./Section";
import { useFormik } from "formik";
import LoginForm from "./LoginForm";
import { Icon } from "@iconify/react";
import Page from "src/components/Page";
import Logo from "src/components/Logo";
import SocialLogin from "./SocialLogin";
import useAuth from "src/hooks/useAuth";
import { useSnackbar } from "notistack";
import { PATH_PAGE } from "src/routes/paths";
import closeFill from "@iconify-icons/eva/close-fill";
import { Link as RouterLink } from "react-router-dom";
import useIsMountedRef from "src/hooks/useIsMountedRef";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Link,
  Alert,
  Tooltip,
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

function LoginView() {
  const classes = useStyles();
  const { method, login } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const smDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("电子邮件必须是一个合法的电邮地址")
      .required("电子邮件地址是必填项"),
    password: Yup.string().required("密码是必填项"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        await login({
          email: values.email,
          password: values.password,
        });
        enqueueSnackbar("登录成功！", {
          variant: "success",
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
        resetForm();
        if (isMountedRef.current) {
          setSubmitting(false);
          setErrors({ afterSubmit: error.code || error.message });
        }
      }
    },
  });

  return (
    <Page title="登录 | 远程狗" className={classes.root}>
      <header className={classes.header}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        {smDown ? null : (
          <Typography
            variant="body2"
            sx={{
              mt: { md: -2 },
            }}
          >
            还没有账号? &nbsp;
            <Link
              underline="none"
              variant="subtitle2"
              component={RouterLink}
              to={PATH_PAGE.auth.register}
            >
              现在就注册
            </Link>
          </Typography>
        )}
      </header>

      {mdDown ? null : <Section />}

      <Container maxWidth="sm">
        <div className={classes.content}>
          <Box sx={{ mb: 5, display: "flex", alignItems: "center" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                Hi，欢迎回来
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                请在下面的表格中输入您的登录信息
              </Typography>
            </Box>
            <Tooltip title={method === "firebase" ? "Firebase" : "JWT"}>
              <Box
                component="img"
                src={`/static/icons/${
                  method === "firebase" ? "ic_firebase" : "ic_jwt"
                }.png`}
                sx={{ width: 32, height: 32 }}
              />
            </Tooltip>
          </Box>

          {method === "firebase" && <SocialLogin />}

          <Alert severity="info" sx={{ mb: 5 }}>
            用户名 : <strong>yihao@test.com</strong> / 密码 :
            <strong>&nbsp;12345</strong>
          </Alert>

          <LoginForm formik={formik} />
          {smUp ? null : (
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              还没有账号?&nbsp;
              <Link
                variant="subtitle2"
                component={RouterLink}
                to={PATH_PAGE.auth.register}
              >
                现在就注册
              </Link>
            </Typography>
          )}
        </div>
      </Container>
    </Page>
  );
}

export default LoginView;
