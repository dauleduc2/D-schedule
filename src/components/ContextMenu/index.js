import React from "react";
import { useDispatch } from "react-redux";
import * as dayActions from "../../actions/dayActions";
import "./style.css";
function ContextMenu(props) {
  const dispatch = useDispatch();
  const { day, month, year } = props;

  let moveToDaySchedule = (e) => {
    let dayScheduleWrapperElement = document.getElementsByClassName(
      "dayScheduleWrapper"
    );
    dayScheduleWrapperElement[0].classList.add("goIn");
  };
  let onAddEventClick = (e) => {
    e.stopPropagation();
    let grayLayer = document.getElementById("grayLayerWrapper");
    let addPage = document.getElementsByClassName("addPageWrapper");
    addPage[0].style.display = "unset";
    grayLayer.style.display = "unset";
    dispatch(dayActions.setDay(day));
    dispatch(dayActions.setMonth(month));
    dispatch(dayActions.setYear(year));
  };
  let onViewClick = (e) => {
    e.stopPropagation();
    moveToDaySchedule();
    dispatch(dayActions.setDay(day));
    dispatch(dayActions.setMonth(month));
    dispatch(dayActions.setYear(year));
  };
  return (
    <div className="contextMenuWrapper">
      <div className="selection addEvent" onClick={(e) => onAddEventClick(e)}>
        Add event
      </div>
      <div className="selection view" onClick={(e) => onViewClick(e)}>
        View schedule
      </div>
    </div>
  );
}

export default ContextMenu;
