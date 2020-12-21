import {
  GET_LOCATIONS_SUCCESS,
  GET_LOCATIONS_FAILURE,
  ADD_LOCATION_SUCCESS,
  ADD_LOCATION_FAILURE,
  UPDATE_LOCATION_SUCCESS,
  UPDATE_LOCATION_FAILURE,
  DELETE_LOCATION_SUCCESS,
  DELETE_LOCATION_FAILURE,
} from "../actions/types";

const initialState = {
  data: [],
  loading: true,
  errors: [],
};

export default function locations(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LOCATIONS_SUCCESS:
      return {
        ...state,
        data: [...payload],
        loading: false,
      };
    case GET_LOCATIONS_FAILURE:
      return {
        ...state,
        data: [],
        loading: false,
        errors: payload,
      };
    case ADD_LOCATION_SUCCESS:
      return {
        ...state,
        data: [...state.data, payload],
        loading: false,
        errors: [],
      };
    case ADD_LOCATION_FAILURE:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    case UPDATE_LOCATION_SUCCESS:
      return {
        ...state,
        data: state.data.map((location) =>
          location.id === payload.id ? payload : location
        ),
        loading: false,
        errors: [],
      };
    case UPDATE_LOCATION_FAILURE:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    case DELETE_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.filter((location) => !payload.includes(location.id)),
      };
    case DELETE_LOCATION_FAILURE:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    default:
      return state;
  }
}
