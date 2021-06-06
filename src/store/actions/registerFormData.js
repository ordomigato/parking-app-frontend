import {
  INITIALIZE_FORM,
  UPDATE_VEHICLE_REGISTER_FORM_DATA,
  SUBMIT_PERMIT_SUCCESS,
  SUBMIT_PERMIT_FAIL,
  SELECTED_LOCATION_UPDATE,
  CLEAR_ERRORS,
} from "./types";
import axios from "axios";

export const initializeVRFormData = info => dispatch => {
  dispatch({
    type: INITIALIZE_FORM,
    payload: info,
  });
};

export const updateVRFormData = payload => dispatch => {
  dispatch({
    type: UPDATE_VEHICLE_REGISTER_FORM_DATA,
    payload: payload,
  });
};

export const updateSelectedLocation = payload => dispatch => {
  dispatch({
    type: SELECTED_LOCATION_UPDATE,
    payload: payload,
  });
};

export const submitVRFormData = (payload, userId) => async dispatch => {
  const formData = { ...payload };

  // format data presend
  formData.location = payload.location.id;
  formData.sublocation = payload.sublocation.id;
  formData.userId = userId || null;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // payload is form data
  const body = JSON.stringify(formData);
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/permits`,
      body,
      config
    );

    dispatch({
      type: SUBMIT_PERMIT_SUCCESS,
      payload: res.data.createdPermit,
    });

    return res.data;
  } catch (err) {
    const errors = err.response.data.errors;
    const errorsArray = [];
    errors.forEach(error => errorsArray.push(error.msg));
    dispatch({
      type: SUBMIT_PERMIT_FAIL,
      payload: errorsArray,
    });

    return err.response.data.success;
  }
};

export const clearErrors = () => dispatch => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
