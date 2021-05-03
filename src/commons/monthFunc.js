export const monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const changeMonthNumberToWord = (month) => {
  let monthText;
  switch (month) {
    case 1:
      monthText = "January";
      break;
    case 2:
      monthText = "February";
      break;
    case 3:
      monthText = "March";
      break;
    case 4:
      monthText = "April";
      break;
    case 5:
      monthText = "May";
      break;
    case 6:
      monthText = "June";
      break;
    case 7:
      monthText = "July";
      break;
    case 8:
      monthText = "August";
      break;
    case 9:
      monthText = "September";
      break;
    case 10:
      monthText = "October";
      break;
    case 11:
      monthText = "November";
      break;
    case 12:
      monthText = "December";
      break;
    default:
      break;
  }
  return monthText;
};

export const changeMonthWordTohNumber = (monthText) => {
  let monthNumber;
  switch (monthText) {
    case "January":
      monthNumber = 1;
      break;
    case "February":
      monthNumber = 2;
      break;
    case "March":
      monthNumber = 3;
      break;
    case "April":
      monthNumber = 4;
      break;
    case "May":
      monthNumber = 5;
      break;
    case "June":
      monthNumber = 6;
      break;
    case "July":
      monthNumber = 7;
      break;
    case "August":
      monthNumber = 8;
      break;
    case "September":
      monthNumber = 9;
      break;
    case "October":
      monthNumber = 10;
      break;
    case "November":
      monthNumber = 11;
      break;
    case "December":
      monthNumber = 12;
      break;
    default:
      break;
  }
  return monthNumber;
};
