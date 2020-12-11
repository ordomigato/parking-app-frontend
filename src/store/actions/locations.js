import { GET_LOCATIONS_SUCCESS, GET_LOCATIONS_FAILURE } from "./types";
import axios from "axios";

export const getLocations = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/locations`
    );

    dispatch({
      type: GET_LOCATIONS_SUCCESS,
      payload: res.data.locations,
    });
  } catch (error) {
    const errors = err.response.data.errors;
    const errorsArray = [];
    errors.forEach((error) => errorsArray.push(error.msg));
    dispatch({
      payload: errorsArray,
      type: GET_LOCATIONS_FAILURE,
    });
  }
};

export const deleteLocation = (locations) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    data: locations,
  };

  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/locations/delete`,
      config
    );

    dispatch({
      type: DELETE_LOCATION_SUCCESS,
    });
    return res;
  } catch (err) {
    const errors = err.response.data.errors;
    const errorsArray = [];
    errors.forEach((error) => errorsArray.push(error.msg));
    dispatch({
      payload: errorsArray,
      type: DELETE_LOCATION_FAILURE,
    });
  }
};

export const updateLocation = (payload) => async (dispatch) => {
  try {
    // update function
  } catch (error) {
    const errors = err.response.data.errors;
    const errorsArray = [];
    errors.forEach((error) => errorsArray.push(error.msg));
    dispatch({
      payload: errorsArray,
      type: UPDATE_LOCATION_FAILURE,
    });
  }
};
