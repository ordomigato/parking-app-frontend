import {
  GET_PERMITS_SUCCESS,
  GET_PERMITS_FAILURE,
  UPDATE_PERMIT_SUCCESS,
  UPDATE_PERMIT_FAILURE,
  GET_USERS_PERMITS_SUCCESS,
  GET_USERS_PERMITS_FAILURE,
} from "../actions/types";
const initialState = {
  permits: [],
  usersPermits: [],
  loading: true,
  errors: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PERMITS_SUCCESS:
      return {
        ...state,
        permits: payload,
        loading: false,
        errors: [],
      };
    case GET_PERMITS_FAILURE:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    case UPDATE_PERMIT_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: [],
      };
    case UPDATE_PERMIT_FAILURE:
      return {
        ...state,
        loading: false,
        errors: payload,
      };

    case GET_USERS_PERMITS_SUCCESS:
      return {
        ...state,
        loading: false,
        usersPermits: payload,
        errors: [],
      };
    case GET_USERS_PERMITS_FAILURE:
      return {
        ...state,
        loading: false,
        usersPermits: [],
        errors: payload,
      };
    default:
      return state;
  }
}
