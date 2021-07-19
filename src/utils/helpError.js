// ----------------------------------------------------------------------

export const codes = {
  // Email
  emailAlreadyinUse: {
    code: "auth/email-already-in-use",
    text: "该电子邮箱已经被注册，请使用另外一个电邮地址",
  },
  invalidEmail: {
    code: "auth/invalid-email",
    text: "不合规的电子邮箱地址",
  },
  userDisabled: {
    code: "auth/user-disabled",
    text: "该用户已经被封禁",
  },
  userNotFound: {
    code: "auth/user-not-found",
    text: "找不到使用这个电子邮箱的用户",
  },
  userNameAlreadyUsed: {
    code: "auth/userName-already-used",
    text: "该用户名已经被注册，请使用另外一个用户名",
  },

  // Password
  wrongPassword: {
    code: "auth/wrong-password",
    text: "密码错误",
  },
  weakPassword: {
    code: "auth/weak-password",
    text: "密码至少需要6位字符或数字",
  },
};

const {
  emailAlreadyinUse,
  invalidEmail,
  userDisabled,
  userNotFound,
  wrongPassword,
  weakPassword,
} = codes;

export function emailError(errors) {
  return {
    error:
      errors === emailAlreadyinUse.code ||
      errors === invalidEmail.code ||
      errors === userDisabled.code ||
      errors === userNotFound.code,
    helperText:
      (errors === emailAlreadyinUse.code && emailAlreadyinUse.text) ||
      (errors === invalidEmail.code && invalidEmail.text) ||
      (errors === userDisabled.code && userDisabled.text) ||
      (errors === userNotFound.code && userNotFound.text),
  };
}

export function passwordError(errors) {
  return {
    error: errors === wrongPassword.code || errors === weakPassword.code,
    helperText:
      (errors === wrongPassword.code && wrongPassword.text) ||
      (errors === weakPassword.code && weakPassword.text),
  };
}
