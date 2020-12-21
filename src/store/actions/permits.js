import axios from "axios";
import {
  GET_PERMITS_SUCCESS,
  GET_PERMITS_FAILURE,
  DELETE_PERMIT_SUCCESS,
  DELETE_PERMIT_FAILURE,
  UPDATE_PERMIT_SUCCESS,
  UPDATE_PERMIT_FAILURE,
  GET_USERS_PERMITS_SUCCESS,
  GET_USERS_PERMITS_FAILURE,
} from "./types";

// get permits
export const getPermits = () => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/permits`);

    dispatch({
      type: GET_PERMITS_SUCCESS,
      payload: res.data.permits,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    const errorsArray = [];
    errors.forEach((error) => errorsArray.push(error.msg));
    dispatch({
      type: GET_PERMITS_FAILURE,
      payload: errorsArray,
    });
  }
};

// Update Permit
export const updatePermit = (permit) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(permit);
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/permits/update/${permit.id}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_PERMIT_SUCCESS,
      payload: res.data.updatedPermit,
    });

    return res;
  } catch (err) {
    const errors = err.response.data.errors;
    const errorsArray = [];
    errors.forEach((error) => errorsArray.push(error.msg));
    dispatch({
      payload: errorsArray,
      type: UPDATE_PERMIT_FAILURE,
    });
  }
};

// Delete Permit (payload should be array of ID's)
export const deletePermit = (permits) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      data: permits,
    };

    const res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/permits/delete`,
      config
    );

    console.log(permits);

    dispatch({
      type: DELETE_PERMIT_SUCCESS,
      payload: permits,
    });
    return res;
  } catch (err) {
    const errors = err.response.data.errors;
    const errorsArray = [];
    errors.forEach((error) => errorsArray.push(error.msg));
    console.log(err);
    dispatch({
      payload: errorsArray,
      payload: ["Something went wrong"],
      type: DELETE_PERMIT_FAILURE,
    });
  }
};

// Get User's Permits
export const getUsersPermits = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/permits/current-user`
    );

    dispatch({
      type: GET_USERS_PERMITS_SUCCESS,
      payload: res.data.permits,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    const errorsArray = [];
    errors.forEach((error) => errorsArray.push(error.msg));
    dispatch({
      payload: errorsArray,
      type: GET_USERS_PERMITS_FAILURE,
    });
  }
};
