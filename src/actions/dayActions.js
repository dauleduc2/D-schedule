import * as types from "../consts/day";
export const nextMonth = () => {
  return {
    type: types.NEXT_MONTH,
  };
};
export const previousMonth = () => {
  return {
    type: types.PREVIOUS_MONTH,
  };
};
export const nextYearForSelection = () => {
  return {
    type: types.NEXT_YEAR_FOR_SELECTION,
  };
};
export const previousYearForSelection = () => {
  return {
    type: types.PREVIOUS_YEAR_FOR_SELECTION,
  };
};
export const setMonth = (month) => {
  return {
    type: types.SET_MONTH_SELECTED,
    payload: month,
  };
};
export const setYear = (year) => {
  return {
    type: types.SET_YEAR_SELECTED,
    payload: year,
  };
};
export const getConfirmationOfSelectedDay = (month, year) => {
  return {
    type: types.GET_CONFIRMATON_OF_SELECTED_DAY,
    payload: {
      month,
      year,
    },
  };
};
export const resetSelection = () => {
  return {
    type: types.RESET_SELECTION,
  };
};
