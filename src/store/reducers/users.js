import { GET_USERS } from "../actions/types";
const initialState = {
  accounts: [],
  loading: true,
  errors: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
}
