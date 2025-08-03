import { combineReducers } from "redux";
import loginReducer from "../authSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import searchReducer from "../searchReducer";
import bookingReducer from "../bookingReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["login", "search", "booking"]
};

const rootReducer = combineReducers({
  login: loginReducer,
  search: searchReducer,
  booking: bookingReducer
});

export default persistReducer(persistConfig, rootReducer);
