import { combineReducers } from "redux";
import { dayReducer } from "./dayReducer";

const rootReducer = combineReducers({
  day: dayReducer,
});

export default rootReducer;
