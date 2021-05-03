import * as types from "../consts/daySchedule";

export const addTask = (task) => {
  return {
    type: types.ADD_TASK,
    payload: task,
  };
};
export const removeTask = (time, slot) => {
  return {
    type: types.REMOVE_TASK,
    payload: {
      time,
      slot,
    },
  };
};

export const updateTask = (time, slot, data) => {
  return {
    type: types.UPDATE_TASK,
    payload: {
      time,
      slot,
      data,
    },
  };
};

export const setEditting = (isEditting, edittingData) => {
  return {
    type: types.SET_EDDITING_STATUS,
    payload: { isEditting, edittingData },
  };
};

export const resetEditting = () => {
  return {
    type: types.RESET_EDITTING,
  };
};
