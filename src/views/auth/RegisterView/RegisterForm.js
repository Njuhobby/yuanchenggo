import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Form, FormikProvider } from "formik";
import eyeFill from "@iconify-icons/eva/eye-fill";
import eyeOffFill from "@iconify-icons/eva/eye-off-fill";
import { emailError, passwordError } from "src/utils/helpError";
import { Box, TextField, IconButton, InputAdornment } from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
// ----------------------------------------------------------------------

RegisterForm.propTypes = {
  formik: PropTypes.object.isRequired,
};

const userRoles = [
  {
    display: "打工人",
    value: "normal",
  },
  {
    display: "金主",
    value: "employer",
  },
];

function RegisterForm({ formik }) {
  const [showPassword, setShowPassword] = useState(false);
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="用户名"
          {...getFieldProps("userName")}
          error={Boolean(touched.userName && errors.userName)}
          helperText={touched.userName && errors.userName}
        />
        <Box sx={{ mb: 3 }} />
        <TextField
          fullWidth
          name="email"
          type="email"
          label="电子邮箱"
          {...getFieldProps("email")}
          error={
            Boolean(touched.email && errors.email) ||
            emailError(errors.afterSubmit).error
          }
          helperText={
            (touched.email && errors.email) ||
            emailError(errors.afterSubmit).helperText
          }
        />
        <Box sx={{ mb: 3 }} />
        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          label="密码"
          {...getFieldProps("password")}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton
                  edge="end"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={
            Boolean(touched.password && errors.password) ||
            passwordError(errors.afterSubmit).error
          }
          helperText={
            (touched.password && errors.password) ||
            passwordError(errors.afterSubmit).helperText
          }
        />
        <Box sx={{ mb: 3 }} />
        <TextField
          select
          fullWidth
          label="我是"
          SelectProps={{ native: true }}
          {...getFieldProps("role")}
          error={Boolean(touched.role && errors.role)}
        >
          {userRoles.map((userRole, index) => (
            <option key={`userRole_${index}`} value={userRole.value}>
              {userRole.display}
            </option>
          ))}
        </TextField>
        <Box sx={{ mt: 3 }}>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            pending={isSubmitting}
          >
            注册
          </LoadingButton>
        </Box>
      </Form>
    </FormikProvider>
  );
}

export default RegisterForm;
