import * as types from "../consts/daySchedule";
import { timeList } from "../commons/configInformation";
let daySchedule = JSON.parse(localStorage.getItem("dayScheduleList"));
for (let i = 0; i < daySchedule.length; i++) {
  const element = daySchedule[i];
  let count = 0;
  for (let j = 0; j < element.taskName.length; j++) {
    const aTask = element.taskName[j];
    if (aTask !== null) {
      count++;
    }
  }
  if (count === 0) {
    daySchedule.splice(i, 1);
  }
}
const initialState = {
  daySchedule: daySchedule ? daySchedule : [],
  editting: false,
  dataEditting: null,
  dateEditting: null,
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
  let shift;
  let initialShift;
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
      decoyState = state.daySchedule.slice();
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
      decoyState = state.daySchedule.slice();
      index = findIndexOfYear(decoyState, day, month, year);
      decoyState[index].description[slot] = null;
      decoyState[index].isImportant[slot] = null;
      decoyState[index].place[slot] = null;
      decoyState[index].taskName[slot] = null;

      localStorage.setItem("dayScheduleList", JSON.stringify(decoyState));
      return {
        ...state,
        daySchedule: decoyState,
      };
    case types.SET_EDDITING_STATUS:
      decoyState = state.daySchedule.slice();
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
      // index = findIndexOfYear(
      //   decoyState,
      //   dayEditting,
      //   monthEditting,
      //   yearEditting
      // );
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
        dayEditting: {
          day: dayEditting,
          month: monthEditting,
          year: yearEditting,
        },
      };

    case types.RESET_EDITTING:
      return {
        ...state,
        editting: false,
        dataEditting: null,
        dayEditting: null,
      };
    case types.UPDATE_TASK:
      decoyState = state.daySchedule.slice();
      let { data: updateData, initialTime } = action.payload;
      let isTimeChange = initialTime !== updateData.time;

      let {
        day: dayUpdate,
        month: monthUpdate,
        year: yearUpdate,
      } = state.dayEditting;
      index = findIndexOfYear(decoyState, dayUpdate, monthUpdate, yearUpdate);
      shift = timeList.indexOf(updateData.time);

      if (isTimeChange) {
        // is time change == true ==> the current task will be deleted and then move this to new time (shift)
        initialShift = timeList.indexOf(initialTime);
        // delete current task in before change time shift
        decoyState[index].description[initialShift] = null;
        decoyState[index].isImportant[initialShift] = null;
        decoyState[index].place[initialShift] = null;
        decoyState[index].taskName[initialShift] = null;
        // change current task to new time
        decoyState[index].description[shift] = updateData.description;
        decoyState[index].isImportant[shift] = updateData.importance;
        decoyState[index].place[shift] = updateData.place;
        decoyState[index].taskName[shift] = updateData.name;
      } else {
        // time not change ==> just update new data
        decoyState[index].description[shift] = updateData.description;
        decoyState[index].isImportant[shift] = updateData.importance;
        decoyState[index].place[shift] = updateData.place;
        decoyState[index].taskName[shift] = updateData.name;
      }

      localStorage.setItem("dayScheduleList", JSON.stringify(decoyState));
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
