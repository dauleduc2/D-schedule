import * as types from "../consts/daySchedule";
import { timeList } from "../commons/configInformation";
let daySchedule = JSON.parse(localStorage.getItem("dayScheduleList"));
const initialState = {
  daySchedule: daySchedule ? daySchedule : [],
  editting: false,
  dataEditting: null,
};
let findIndexOfYear = (state, daySelected, monthSelected, yearSelected) => {
  let result;
  state.forEach((dayList, index) => {
    let { day, month, year } = dayList.day;
    if (
      day === daySelected &&
      month === monthSelected &&
      year === yearSelected
    ) {
      result = index;
    }
  });
  return result;
};
export const dayScheduleReducer = (state = initialState, action) => {
  let decoyState;
  let index;
  let isAlreadyHave = null;
  switch (action.type) {
    case types.ADD_TASK:
      let {
        yearSelected,
        daySelected,
        monthSelected,
        description,
        importance,
        name,
        place,
        time,
      } = action.payload;
      decoyState = state.daySchedule;
      let task = {
        day: {
          day: daySelected,
          month: monthSelected,
          year: yearSelected,
        },
        taskName: [null, null, null, null, null, null, null, null],
        place: [null, null, null, null, null, null, null, null],
        description: [null, null, null, null, null, null, null, null],
        isImportant: [null, null, null, null, null, null, null, null],
      };
      decoyState.forEach((data, index) => {
        if (
          data.day.day === daySelected &&
          data.day.month === monthSelected &&
          data.day.year === yearSelected
        ) {
          task = decoyState[index];
          isAlreadyHave = index;
        }
      });
      for (let i = 0; i < timeList.length; i++) {
        const timeInList = timeList[i];
        if (time === timeInList) {
          index = i;
          break;
        }
      }

      task.taskName[index] = name;
      task.place[index] = place;
      task.description[index] = description;
      task.isImportant[index] = importance;
      if (isAlreadyHave != null) {
        decoyState[isAlreadyHave] = task;
      } else {
        decoyState.push(task);
      }
      localStorage.setItem("dayScheduleList", JSON.stringify(decoyState));
      return {
        ...state,
        daySchedule: decoyState,
      };
    case types.REMOVE_TASK:
      let { day, month } = action.payload.time;
      let year = action.payload.time.yearSelected;
      let { slot } = action.payload;
      decoyState = state.daySchedule;
      index = findIndexOfYear(decoyState, day, month, year);
      decoyState[index].description[slot] = null;
      decoyState[index].isImportant[slot] = null;
      decoyState[index].place[slot] = null;
      decoyState[index].taskName[slot] = null;
      localStorage.setItem("dayScheduleList", JSON.stringify(decoyState));
      return {
        ...state,
      };
    case types.SET_EDDITING_STATUS:
      decoyState = state.daySchedule;
      let { isEditting } = action.payload;
      let {
        edittingData: {
          time: {
            day: dayEditting,
            month: monthEditting,
            yearSelected: yearEditting,
          },
          slot: slotEditting,
          data: {
            description: descriptionEditting,
            isImportant: isImportantEditting,
            place: placeEditting,
            taskName: taskNameEditting,
          },
        },
      } = action.payload;
      index = findIndexOfYear(
        decoyState,
        dayEditting,
        monthEditting,
        yearEditting
      );
      let dataEditting = {
        description: descriptionEditting,
        importance: isImportantEditting,
        place: placeEditting,
        name: taskNameEditting,
        time: timeList[slotEditting],
      };

      return {
        ...state,
        editting: isEditting,
        dataEditting,
      };
    case types.RESET_EDITTING:
      return {
        ...state,
        editting: false,
        dataEditting: null,
      };
    case types.UPDATE_TASK:
      return {
        ...state,
        daySchedule: decoyState,
      };
    default:
      return {
        ...state,
      };
  }
};
