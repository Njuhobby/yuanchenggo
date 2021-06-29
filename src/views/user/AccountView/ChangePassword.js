import clsx from "clsx";
import React from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import fakeRequest from "src/utils/fakeRequest";
import { useFormik, Form, FormikProvider } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Card, TextField } from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  margin: {
    marginBottom: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

ChangePassword.propTypes = {
  className: PropTypes.string,
};

function ChangePassword({ className }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required("请填写现有密码"),
    newPassword: Yup.string()
      .min(6, "密码长度至少6位")
      .required("请填写新密码"),
    confirmNewPassword: Yup.string().oneOf(
      [Yup.ref("newPassword"), null],
      "两次输入的新密码不符"
    ),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: ChangePassWordSchema,
    onSubmit: async (values, { setSubmitting }) => {
      await fakeRequest(500);
      setSubmitting(false);
      alert(JSON.stringify(values, null, 2));
      enqueueSnackbar("Save success", { variant: "success" });
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Card className={clsx(classes.root, className)}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <TextField
            {...getFieldProps("oldPassword")}
            fullWidth
            type="password"
            label="现有密码"
            error={Boolean(touched.oldPassword && errors.oldPassword)}
            helperText={touched.oldPassword && errors.oldPassword}
            className={classes.margin}
          />

          <TextField
            {...getFieldProps("newPassword")}
            fullWidth
            type="password"
            label="新密码"
            error={Boolean(touched.newPassword && errors.newPassword)}
            helperText={
              (touched.newPassword && errors.newPassword) || "密码长度最少6位"
            }
            className={classes.margin}
          />

          <TextField
            {...getFieldProps("confirmNewPassword")}
            fullWidth
            type="password"
            label="再次输入新密码"
            error={Boolean(
              touched.confirmNewPassword && errors.confirmNewPassword
            )}
            helperText={touched.confirmNewPassword && errors.confirmNewPassword}
            className={classes.margin}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <LoadingButton
              type="submit"
              variant="contained"
              pending={isSubmitting}
            >
              保存修改
            </LoadingButton>
          </Box>
        </Form>
      </FormikProvider>
    </Card>
  );
}

export default ChangePassword;
