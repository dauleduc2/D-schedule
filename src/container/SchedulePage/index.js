import React, { useEffect } from "react";
import "./style.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import calendar from "../../zellerRule/index";
import DaySquare from "../../components/DaySquare";
import { useDispatch, useSelector } from "react-redux";
import * as dayActions from "../../actions/dayActions";
import * as monthFuc from "../../commons/monthFunc";
function SchedulePage() {
  useEffect(() => {
    let daySquareList = document.getElementsByClassName("squareOfDay");
    for (let i = 0; i < daySquareList.length; i++) {
      const element = daySquareList[i];
      if (element.className === "squareOfDay selectedSquare") {
        element.classList.remove("selectedSquare");
      }
    }
  });
  const dispatch = useDispatch();
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();
  const currentDay = today.getDate();
  const month = useSelector((state) => state.day.month);
  const year = useSelector((state) => state.day.year);
  let renderCalender = (calender, line) => {
    let result;
    result = calender.map((day, index) => {
      if (index < line * 7 && index >= (line - 1) * 7) {
        if (
          day === currentDay &&
          month === currentMonth &&
          year === currentYear
        ) {
          return (
            <DaySquare day={day} activeDay={true} month={month} year={year} />
          );
        } else {
          return (
            <DaySquare day={day} activeDay={false} month={month} year={year} />
          );
        }
      }
    });
    return result;
  };
  let openChooseDayBox = () => {
    let grayLayer = document.getElementById("grayLayerWrapper");
    let chooseDayBox = document.getElementById("chooseDayBoxWrapper");
    let confirmButtonWrapperElement = document.getElementsByClassName(
      "confirmButtonWrapper"
    );
    grayLayer.style.display = "unset";
    chooseDayBox.style.display = "unset";
    confirmButtonWrapperElement[0].style.display = "unset";
  };

  let calendarList = calendar(month, year);
  let goToPreviousMonth = () => {
    dispatch(dayActions.previousMonth());
  };
  let goToNextMonth = () => {
    dispatch(dayActions.nextMonth());
  };
  let monthText = monthFuc.changeMonthNumberToWord(month);

  return (
    <div className="scheduleWrapper">
      <div class="monthWrapper">
        <div className="iconWrapper" onClick={() => goToPreviousMonth()}>
          <ArrowBackIosIcon className="backIcon" />
        </div>
        <div className="monthText" onClick={() => openChooseDayBox()}>
          {monthText} {year}
        </div>

        <div className="iconWrapper" onClick={() => goToNextMonth()}>
          <ArrowForwardIosIcon className="forwardIcon" />
        </div>
      </div>
      <table class="table">
        <thead>
          <tr className="day">
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
          </tr>
        </thead>
        <tbody>
          <tr>{renderCalender(calendarList, 1)}</tr>
          <tr>{renderCalender(calendarList, 2)}</tr>
          <tr>{renderCalender(calendarList, 3)}</tr>
          <tr>{renderCalender(calendarList, 4)}</tr>
          <tr>{renderCalender(calendarList, 5)}</tr>
          <tr>{renderCalender(calendarList, 6)}</tr>
        </tbody>
      </table>
    </div>
  );
}

export default SchedulePage;
