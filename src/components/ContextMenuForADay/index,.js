import React from "react";
import "./style.css";
import * as dayScheduleActions from "../../actions/dayScheduleActions";
import { useDispatch } from "react-redux";
function ContextMenuForADay(props) {
  const {
    taskName,
    place,
    description,
    isImportant,
    day,
    month,
    yearSelected,
    shift,
  } = props.data;
  const dispatch = useDispatch();
  let onDeleteTask = (time, slot) => {
    dispatch(dayScheduleActions.removeTask(time, slot));
  };
  let onUpdateTask = (time, slot, data) => {
    // dispatch(dayScheduleActions.updateTask(time, slot, data));
    let addPage = document.getElementsByClassName("addPageWrapper")[0];
    let grayLayer = document.getElementById("grayLayerWrapper");
    addPage.style.display = "unset";
    grayLayer.style.display = "unset";
    dispatch(dayScheduleActions.setEditting(true, { time, slot, data }));
  };
  return (
    <div className="contextMenuForADayWrapper">
      <div
        className="selection"
        onClick={() => {
          onUpdateTask({ day, month, yearSelected }, shift, {
            taskName,
            place,
            description,
            isImportant,
          });
        }}
      >
        Change
      </div>
      <div
        className="selection"
        onClick={() => {
          onDeleteTask({ day, month, yearSelected }, shift);
        }}
      >
        Delete
      </div>
    </div>
  );
}

export default ContextMenuForADay;
