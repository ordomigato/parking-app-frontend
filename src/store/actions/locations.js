import {
  GET_LOCATIONS_SUCCESS,
  GET_LOCATIONS_FAILURE,
  ADD_LOCATION_SUCCESS,
  ADD_LOCATION_FAILURE,
  UPDATE_LOCATION_SUCCESS,
  UPDATE_LOCATION_FAILURE,
  DELETE_LOCATION_SUCCESS,
  DELETE_LOCATION_FAILURE,
  ADD_SUBLOCATION_SUCCESS,
  ADD_SUBLOCATION_FAILURE,
  UPDATE_SUBLOCATION_SUCCESS,
  UPDATE_SUBLOCATION_FAILURE,
  DELETE_SUBLOCATION_SUCCESS,
  DELETE_SUBLOCATION_FAILURE,
} from "./types";
import axios from "axios";

export const addSublocation = (sublocationInfo) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(sublocationInfo);
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/sublocations`,
      body,
      config
    );

    dispatch({
      type: ADD_SUBLOCATION_SUCCESS,
      payload: res.data.location,
    });

    return res;
  } catch (err) {
    const errors = err.response.data.errors;
    const errorsArray = [];
    errors.forEach((error) => errorsArray.push(error.msg));
    dispatch({
      payload: errorsArray,
      type: ADD_SUBLOCATION_FAILURE,
    });
    console.log(err.response);
    return err.response;
  }
};

export const updateSublocation = (payload) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(payload);

    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/sublocations/update/${payload.id}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_SUBLOCATION_SUCCESS,
      payload: payload,
    });

    return res;
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;
    const errorsArray = [];
    errors.forEach((error) => errorsArray.push(error.msg));
    dispatch({
      payload: errorsArray,
      type: UPDATE_SUBLOCATION_FAILURE,
    });
  }
};

export const deleteSublocation = (sublocationIds, locationId) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    data: sublocationIds,
  };

  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/sublocations/delete`,
      config
    );

    dispatch({
      type: DELETE_SUBLOCATION_SUCCESS,
      payload: { sublocationIds, locationId },
    });

    return res;
  } catch (err) {
    const errors = err.response.data.errors;
    const errorsArray = [];
    errors.forEach((error) => errorsArray.push(error.msg));
    dispatch({
      payload: errorsArray,
      type: DELETE_SUBLOCATION_FAILURE,
    });
  }
};

export const getLocations = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/locations`
    );

    dispatch({
      type: GET_LOCATIONS_SUCCESS,
      payload: res.data.locations,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    const errorsArray = [];
    errors.forEach((error) => errorsArray.push(error.msg));
    dispatch({
      payload: errorsArray,
      type: GET_LOCATIONS_FAILURE,
    });
  }
};

export const addLocation = (location) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(location);

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/locations`,
      body,
      config
    );

    dispatch({
      payload: res.data.location,
      type: ADD_LOCATION_SUCCESS,
    });

    return res;
  } catch (err) {
    const errors = err.response.data.errors;
    const errorsArray = [];
    errors.forEach((error) => errorsArray.push(error.msg));
    dispatch({
      payload: errorsArray,
      type: ADD_LOCATION_FAILURE,
    });
    throw err.response;
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
      payload: locations,
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

export const updateLocation = (location) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(location);
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/locations/update/${location.id}`,
      body,
      config
    );

    console.log(res.data.location);

    dispatch({
      type: UPDATE_LOCATION_SUCCESS,
      payload: res.data.location,
    });

    return res;
  } catch (err) {
    console.log(err.response);
    const errors = err.response.data.errors;
    const errorsArray = [];
    errors.forEach((error) => errorsArray.push(error.msg));
    dispatch({
      payload: errorsArray,
      type: UPDATE_LOCATION_FAILURE,
    });
    return err.response;
  }
};
