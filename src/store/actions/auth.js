import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  UPDATE_CURRENT_USER_SUCCESS,
  UPDATE_CURRENT_USER_FAILURE,
  UPDATE_CURRENT_USER_PASSWORD_SUCCESS,
  UPDATE_CURRENT_USER_PASSWORD_FAILURE,
} from "./types";
import setAuthToken from "../../utils/setAuthToken";
import { AccordionSummary } from "@material-ui/core";

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth`);

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Login user
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/auth/login`,
      body,
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    const errorsArray = [];
    errors.forEach((error) => errorsArray.push(error.msg));
    dispatch({
      type: LOGIN_FAIL,
      payload: errorsArray,
    });
  }
};

// Register User
export const register = (user) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(user);

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/auth/register`,
      body,
      config
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(login(user.email, user.password));
  } catch (err) {
    const errors = err.response.data.errors;
    const errorsArray = [];
    errors.forEach((error) => errorsArray.push(error.msg));
    dispatch({
      type: REGISTER_FAIL,
      payload: errorsArray,
    });
  }
};

// Update current user
export const updateCurrentUser = (userData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(userData);
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/users/update/current-user`,
      body,
      config
    );

    dispatch({
      type: UPDATE_CURRENT_USER_SUCCESS,
      payload: res.data.user,
    });

    return res;
  } catch (err) {
    const errors = err.response.data.errors;
    const errorsArray = [];
    errors.forEach((error) => errorsArray.push(error.msg));
    dispatch({
      type: UPDATE_CURRENT_USER_FAILURE,
      payload: errorsArray,
    });
  }
};

// change current user's password
export const changePassword = (passwordData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(passwordData);

  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/users/change-password`,
      body,
      config
    );

    dispatch({
      type: UPDATE_CURRENT_USER_PASSWORD_SUCCESS,
    });

    return res;
  } catch (err) {
    const errors = err.response.data.errors;
    const errorsArray = [];
    errors.forEach((error) => errorsArray.push(error.msg));
    dispatch({
      type: UPDATE_CURRENT_USER_PASSWORD_FAILURE,
      payload: errorsArray,
    });
  }
};

// Logout & Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
