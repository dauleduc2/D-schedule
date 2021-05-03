import { combineReducers } from "redux";
import { dayReducer } from "./dayReducer";
import { reducer as formReducer } from "redux-form";
import { dayScheduleReducer } from "./dayScheduleReducer";
const rootReducer = combineReducers({
  day: dayReducer,
  daySchedule: dayScheduleReducer,
  form: formReducer,
});

export default rootReducer;
