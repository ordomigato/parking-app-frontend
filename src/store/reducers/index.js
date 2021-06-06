import { combineReducers } from "redux";
import registerVRFormData from "./registerVRFormData";
import locations from "./locations";
import auth from "./auth";
import permits from "./permits";
import users from "./users";

export default combineReducers({
  registerVRFormData,
  locations,
  auth,
  permits,
  users,
});
