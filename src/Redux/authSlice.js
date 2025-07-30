export const SET_LOGIN_DATA = 'SET_LOGIN_DATA';
export const CLEAR_LOGIN_DATA = 'CLEAR_LOGIN_DATA';

// Initial state
const initialState = {
  login_data: {
    token: "",
    email: "",
    user: null,
  },
};

// Reducer
export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOGIN_DATA:
      return {
        ...state,
        login_data: {
          token: action.payload?.token || "",
          email: action.payload?.email || "",
          user: action.payload?.user || null,
        },
      };

    case CLEAR_LOGIN_DATA:
      return {
        ...state,
        login_data: {
          token: "",
          email: "",
          user: null,
        },
      };

    default:
      return state;
  }
}
