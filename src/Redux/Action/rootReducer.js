import { combineReducers } from "redux";
import loginReducer from "../authSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import searchReducer from "../searchReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["login", "search"]
};

const rootReducer = combineReducers({
  login: loginReducer,
  search: searchReducer
});

export default persistReducer(persistConfig, rootReducer);
