import clsx from "clsx";
import React from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import useAuth from "src/hooks/useAuth";
import { UploadAvatar } from "src/components/Upload";
import useIsMountedRef from "src/hooks/useIsMountedRef";
import { Form, FormikProvider, useFormik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Grid,
  Card,
  Switch,
  TextField,
  CardContent,
  FormControlLabel,
} from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
}));

// ----------------------------------------------------------------------

General.propTypes = {
  className: PropTypes.string,
};

function General({ className }) {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const { user, updateProfile } = useAuth();

  const UpdateUserSchema = Yup.object().shape({
    userName: Yup.string().required("Name is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      userName: user.userName,
      email: user.email,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      address: user.address,
      position: user.position,
      company: user.company,
      about: user.about,
      isPublic: user.isPublic,
    },

    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await updateProfile({ ...values });
        enqueueSnackbar("Update success", { variant: "success" });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code });
          setSubmitting(false);
        }
      }
    },
  });

  const { values, isSubmitting, handleSubmit, getFieldProps, setFieldValue } =
    formik;

  return (
    <div className={clsx(classes.root, className)}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <Box
                  sx={{
                    my: 10,
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <UploadAvatar
                    disabled={user.email === "demo@minimals.cc"} // You can remove this
                    value={values.photoURL}
                    onChange={(value) => setFieldValue("photoURL", value)}
                  />
                  <FormControlLabel
                    control={
                      <Switch {...getFieldProps("isPublic")} color="primary" />
                    }
                    labelPlacement="start"
                    label="设置为公开可见"
                  />
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        disabled={user.email === "demo@minimals.cc"} // You can remove this
                        fullWidth
                        label="用户名"
                        {...getFieldProps("userName")}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        disabled
                        label="电子邮件"
                        {...getFieldProps("email")}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="电话号码"
                        {...getFieldProps("phoneNumber")}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="常驻地"
                        {...getFieldProps("address")}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="工作职位"
                        {...getFieldProps("position")}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="当前公司"
                        {...getFieldProps("company")}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        {...getFieldProps("about")}
                        fullWidth
                        multiline
                        minRows={4}
                        maxRows={4}
                        label="介绍下你自己"
                      />
                    </Grid>
                  </Grid>

                  <Box
                    sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}
                  >
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      pending={isSubmitting}
                    >
                      保存修改
                    </LoadingButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </div>
  );
}

export default General;
