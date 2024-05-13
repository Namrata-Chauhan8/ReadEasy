export const signupSuccess = (data) => {
  return {
    type: "SIGNUP_SUCCESS",
    payload: data,
  };
};

export const loginSuccess = (userData) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: userData,
  };
};

export const passwordChangeSuccess = (data) => {
  return {
    type: "PASSWORD_CHANGE_SUCCESS",
  };
};
