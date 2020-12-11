import { GET_LOCATIONS_SUCCESS, GET_LOCATIONS_FAILURE } from "../actions/types";

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
    default:
      return state;
  }
}
