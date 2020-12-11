import {
  UPDATE_VEHICLE_REGISTER_FORM_DATA,
  SUBMIT_PERMIT_SUCCESS,
  SUBMIT_PERMIT_FAIL,
  SELECTED_LOCATION_UPDATE,
} from "../actions/types";

const initialState = {
  formData: {
    location: {
      id: "",
      name: "",
    },
    sublocation: {
      id: "",
      name: "",
    },
    unit: "",
    duration: "",
    firstName: "",
    lastName: "",
    email: "",
    defaultPhone: "",
    vplate: "",
    vmodel: "",
    vmake: "",
    vcolor: "",
    isOvernight: "",
  },
  selectedLocation: null,
  submittedPermit: null,
  loading: true,
  errors: [],
};

export default function registerVRFormData(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_VEHICLE_REGISTER_FORM_DATA:
      return {
        ...state,
        formData: { ...state.formData, [payload.key]: payload.value },
        loading: false,
      };
    case SUBMIT_PERMIT_SUCCESS:
      return {
        ...state,
        loading: false,
        submittedPermit: payload,
        errors: [],
      };
    case SUBMIT_PERMIT_FAIL:
      return {
        ...state,
        loading: false,
        submittedPermit: null,
        errors: payload,
      };
    case SELECTED_LOCATION_UPDATE:
      return {
        ...state,
        loading: false,
        selectedLocation: payload,
      };
    default:
      return state;
  }
}
