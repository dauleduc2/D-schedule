import * as types from "../consts/day";
let today = new Date();
let month = today.getMonth() + 1;
let year = today.getFullYear();
let day = today.getDate();
const initialState = {
  day: day,
  month: month,
  year: year,
  yearForSelection: year,
  monthSelected: null,
  yearSelected: null,
};

export const dayReducer = (state = initialState, action) => {
  let decoyState;
  switch (action.type) {
    case types.NEXT_MONTH:
      decoyState = state;
      if (decoyState.month + 1 > 12) {
        decoyState.month = 1;
        decoyState.year += 1;
      } else {
        decoyState.month += 1;
      }
      return {
        ...state,
      };
    case types.PREVIOUS_MONTH:
      decoyState = state;
      if (decoyState.month - 1 < 1) {
        decoyState.month = 12;
        decoyState.year -= 1;
      } else {
        decoyState.month -= 1;
      }
      return {
        ...state,
      };
    case types.NEXT_YEAR_FOR_SELECTION:
      decoyState = state.yearForSelection;
      decoyState += 10;
      return {
        ...state,
        yearForSelection: decoyState,
      };
    case types.PREVIOUS_YEAR_FOR_SELECTION:
      decoyState = state.yearForSelection;
      decoyState -= 10;
      return {
        ...state,
        yearForSelection: decoyState,
      };
    case types.SET_MONTH_SELECTED:
      decoyState = action.payload;

      return {
        ...state,
        monthSelected: decoyState,
      };
    case types.SET_YEAR_SELECTED:
      decoyState = action.payload;

      return {
        ...state,
        yearSelected: decoyState,
      };
    case types.GET_CONFIRMATON_OF_SELECTED_DAY:
      decoyState = action.payload;
      let monthSelected;
      switch (action.payload.month) {
        case "January":
          monthSelected = 1;
          break;
        case "February":
          monthSelected = 2;
          break;
        case "March":
          monthSelected = 3;
          break;
        case "April":
          monthSelected = 4;
          break;
        case "May":
          monthSelected = 5;
          break;
        case "June":
          monthSelected = 6;
          break;
        case "July":
          monthSelected = 7;
          break;
        case "August":
          monthSelected = 8;
          break;
        case "September":
          monthSelected = 9;
          break;
        case "October":
          monthSelected = 10;
          break;
        case "November":
          monthSelected = 11;
          break;
        case "December":
          monthSelected = 12;
          break;
        default:
          console.log("error of invalid month");
          break;
      }
      let yearSelected = action.payload.year;
      return {
        ...state,
        month: monthSelected,
        year: yearSelected,
      };
    case types.RESET_SELECTION:
      return {
        ...state,
        monthSelected: null,
        yearSelected: null,
      };
    default:
      return {
        ...state,
      };
  }
};
