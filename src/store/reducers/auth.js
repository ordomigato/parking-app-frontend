import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  UPDATE_CURRENT_USER_SUCCESS,
  UPDATE_CURRENT_USER_FAILURE,
  UPDATE_CURRENT_USER_PASSWORD_SUCCESS,
  UPDATE_CURRENT_USER_PASSWORD_FAILURE,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  // isAdmin: null,
  errors: [],
  loading: true,
  user: null,
};

export default function auth(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        // isAdmin: payload.role === 1 || 2 ? true : false,
        loading: false,
        user: payload,
        errors: {
          login: [],
          register: [],
          updateUser: [],
          changePassword: [],
        },
      };
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        // isAdmin: false,
        loading: false,
        errors: [],
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        user: { ...payload },
        isAuthenticated: true,
        loading: false,
        errors: [],
      };
    case LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        // isAdmin: false,
        loading: false,
        errors: { login: payload },
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        // isAdmin: false,
        loading: false,
        errors: [],
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: [],
      };
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        errors: { register: payload },
      };
    case UPDATE_CURRENT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload,
        errors: [],
      };
    case UPDATE_CURRENT_USER_FAILURE:
      return {
        ...state,
        loading: false,
        errors: { updateUser: payload },
      };
    case UPDATE_CURRENT_USER_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: [],
      };
    case UPDATE_CURRENT_USER_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        errors: { changePassword: payload },
      };
    default:
      return state;
  }
}
