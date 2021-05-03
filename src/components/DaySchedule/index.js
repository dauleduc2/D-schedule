import React, { useEffect } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import "./style.css";
import * as dayActions from "../../actions/dayActions";
import { useDispatch, useSelector } from "react-redux";
import * as configInformation from "../../commons/configInformation";
import ContextMenuForADay from "../ContextMenuForADay/index,";

function isLeap(year) {
  if (year % 4 || (year % 100 === 0 && year % 400)) return 0;
  else return 1;
}
function daysIn(month, year) {
  return month === 2 ? 28 + isLeap(year) : 31 - (((month - 1) % 7) % 2);
}

function DaySchedule(props) {
  const dispatch = useDispatch();
  const { monthText, daySelected, monthSelected, yearSelected } = props;
  const daySchedule = useSelector((state) => state.daySchedule.daySchedule);
  const month = monthSelected;
  const day = daySelected;
  const year = yearSelected;
  const dayWeek = new Date(year, month - 1, day).getDay() + 1;
  const timeList = configInformation.timeList;
  let dayInCurrentMonth = daysIn(month);
  let dayInPreviousMonth = daysIn(month - 1);
  let startDay = day - dayWeek;
  let dayList = [
    startDay + 1,
    startDay + 2,
    startDay + 3,
    startDay + 4,
    startDay + 5,
    startDay + 6,
    startDay + 7,
  ];
  let monthList = [month, month, month, month, month, month, month];
  let countNextMonthDay = 1;
  let countPreviousMonthDay = 1;

  for (let i = 1; i <= 7; i++) {
    if (startDay + i > dayInCurrentMonth) {
      dayList[i - 1] = countNextMonthDay;
      monthList[i - 1] = month + 1;
      countNextMonthDay++;
    }
    if (startDay < 0) {
      if (dayList[i - 1] <= 0) {
        dayList[i - 1] = dayInPreviousMonth + startDay + countPreviousMonthDay;
        monthList[i - 1] = month - 1;
        countPreviousMonthDay++;
      }
    }
  }
  let onclose = () => {
    let dayScheduleWrapperElement = document.getElementsByClassName(
      "dayScheduleWrapper"
    );
    dispatch(dayActions.setDay(null));
    dispatch(dayActions.setMonth(null));
    dispatch(dayActions.setYear(null));
    dayScheduleWrapperElement[0].classList.remove("goIn");
  };
  let renderDayList = (shift) => {
    let result;
    let dayHaveTask = [];
    let posInScheduleData = [];
    let posInCurrentWeek = [];
    for (let i = 0; i < 7; i++) {
      const currentDay = dayList[i];
      const currentMonth = monthList[i];
      daySchedule.forEach((dayListTask, index) => {
        let { day, month, year } = dayListTask?.day;
        let taskName = dayListTask.taskName[shift];

        if (
          day === currentDay &&
          month === currentMonth &&
          year === yearSelected &&
          taskName
        ) {
          dayHaveTask.push(day);
          posInScheduleData.push(index);
          posInCurrentWeek.push(i);
        }
      });
    }
    let onOpenContextMenu = (e) => {
      e.preventDefault();
      let contextWrapperElement = document.getElementsByClassName(
        "contextMenuForADayWrapper"
      );
      for (let i = 0; i < contextWrapperElement.length; i++) {
        const element = contextWrapperElement[i];
        element.style.display = "none";
      }
      let squareOfDayElement = e.target.closest(".taskWrapper");
      let contextMenuElement = squareOfDayElement.lastChild;

      if (contextMenuElement) {
        contextMenuElement.style.display = "flex";
        let targetClassName = e.target.className;
        let { clientX, clientY } = e;
        let offsetLeft, offsetTop;
        if (targetClassName === "taskWrapper") {
          offsetLeft = e.target.offsetParent.offsetLeft;
          offsetTop = e.target.offsetParent.offsetTop;
        } else {
          offsetLeft = e.target.offsetParent.offsetParent.offsetLeft;
          offsetTop = e.target.offsetParent.offsetParent.offsetTop;
        }

        let contextMenuHeight = contextMenuElement.clientHeight;
        let pos = {
          left: clientX - offsetLeft,
          top: clientY - offsetTop - 50 - contextMenuHeight - 10,
        };
        contextMenuElement.style.left = pos.left + "px";
        contextMenuElement.style.top = pos.top + "px";
      }
    };
    result = dayList.map((day, count) => {
      if (dayHaveTask.includes(day)) {
        let index = dayHaveTask.indexOf(day);
        let position = posInScheduleData[index];
        let data = daySchedule[position];
        let taskName = data.taskName[shift];
        let place = data.place[shift];
        let description = data.description[shift];
        let isImportant = data.isImportant[shift];

        return (
          <td className="tdWrapper">
            <div
              className="taskWrapper"
              onContextMenu={(e) => onOpenContextMenu(e)}
            >
              <div className="title">
                <span className="subject">{taskName}</span> at
                <span className="numberOfRoom">{place}</span>
              </div>
              <div className="description">
                <span className="noteText">Note : </span>
                {description}
              </div>
              {isImportant === "Important" ? (
                <div className="importance">important</div>
              ) : (
                <div className="unimportant">Not necessary</div>
              )}
              <ContextMenuForADay
                data={{
                  taskName,
                  place,
                  description,
                  isImportant,
                  day,
                  month: monthList[count],
                  yearSelected,
                  shift,
                }}
              />
            </div>
          </td>
        );
      }
      return <td>-</td>;
    });
    return result;
  };
  let renderSchedule = () => {
    let result;
    result = timeList?.map((time, index) => {
      return (
        <tr key={index}>
          <th>{time}</th>
          {renderDayList(index)}
        </tr>
      );
    });

    return result;
  };
  return (
    <div className="dayScheduleWrapper" key={daySchedule}>
      <div class="monthWrapper">
        <div className="iconWrapper" onClick={() => onclose()}>
          <ArrowBackIosIcon className="backIcon" />
        </div>
        <div className="monthText">
          <div className="fromText">
            {dayList[0]}/{monthList[0]}
          </div>
          {" --> "}
          <div className="toText">
            {dayList[6]}/{monthList[6]}
          </div>
          {monthText} {year}
        </div>

        <div></div>
      </div>
      <table class="table">
        <thead>
          <tr className="day">
            <th scope="row"></th>
            <th>
              <div>Sunday</div>
              <div>
                {dayList[0]}/{monthList[0]}
              </div>
            </th>
            <th>
              <div>Monday</div>
              <div>
                {dayList[1]}/{monthList[1]}
              </div>
            </th>
            <th>
              <div>Tuesday</div>
              <div>
                {dayList[2]}/{monthList[2]}
              </div>
            </th>
            <th>
              <div>Wednesday</div>
              <div>
                {dayList[3]}/{monthList[3]}
              </div>
            </th>
            <th>
              <div>Thursday</div>
              <div>
                {dayList[4]}/{monthList[4]}
              </div>
            </th>
            <th>
              <div>Friday</div>
              <div>
                {dayList[5]}/{monthList[5]}
              </div>
            </th>
            <th>
              <div>Saturday</div>
              <div>
                {dayList[6]}/{monthList[6]}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>{renderSchedule()}</tbody>
      </table>
    </div>
  );
}

export default DaySchedule;
