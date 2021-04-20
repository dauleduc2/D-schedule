import React, { Fragment } from "react";
import "./style.css";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@material-ui/icons/ArrowDropUpRounded";
import { useDispatch, useSelector } from "react-redux";
import * as dayActions from "../../actions/dayActions";
import { Button } from "@material-ui/core";
function ChooseDayBox(props) {
  let { onCloseForm } = props;
  const dispatch = useDispatch();
  const yearForSelection = useSelector((state) => state.day.yearForSelection);
  const monthSelected = useSelector((state) => state.day.monthSelected);
  const yearSelected = useSelector((state) => state.day.yearSelected);
  let isDisableConfirmButton = true;
  if (monthSelected && yearSelected) {
    isDisableConfirmButton = false;
  }
  let monthList = [
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

  let moveLineTo = (pos) => {
    let line = document.getElementById("downSideLine");
    line.style.transform = `translateX(${pos - 1}00%)`;
    let content = document.getElementById("content");
    content.style.transform = `translateX(-${(pos - 1) * 50}vw)`;
  };
  let setMonth = (month, e) => {
    dispatch(dayActions.setMonth(month));
    let monthNameBoxElement = document.getElementsByClassName("monthElement");
    for (let i = 0; i < monthNameBoxElement.length; i++) {
      const element = monthNameBoxElement[i];
      element.classList.remove("selected");
    }
    let element = e.target;
    element.parentElement.classList.add("selected");
  };
  let setYear = (year, e) => {
    dispatch(dayActions.setYear(year));
    let monthYearBoxElement = document.getElementsByClassName("yearElement");
    for (let i = 0; i < monthYearBoxElement.length; i++) {
      const element = monthYearBoxElement[i];
      element.classList.remove("selected");
    }
    let element = e.target;
    element.parentElement.classList.add("selected");
  };
  let renderMonth = () => {
    let result;
    result = monthList.map((month, index) => {
      return (
        <div
          className="monthElement monthNameBox"
          key={index}
          onClick={(e) => {
            setMonth(month, e);
          }}
        >
          <div className="text">{month}</div>
        </div>
      );
    });

    return result;
  };
  let resetSelectedBox = () => {
    let monthYearBoxElement = document.getElementsByClassName("yearElement");
    for (let i = 0; i < monthYearBoxElement.length; i++) {
      const element = monthYearBoxElement[i];
      element.classList.remove("selected");
    }
    let monthNameBoxElement = document.getElementsByClassName("monthElement");
    for (let i = 0; i < monthNameBoxElement.length; i++) {
      const element = monthNameBoxElement[i];
      element.classList.remove("selected");
    }
  };
  let onConfirm = () => {
    // send day selection
    dispatch(
      dayActions.getConfirmationOfSelectedDay(monthSelected, yearSelected)
    );
    // reset form
    dispatch(dayActions.resetSelection());
    //reset selected box
    resetSelectedBox();
    // close form
    onCloseForm();
  };
  let onCancel = () => {
    // reset form
    dispatch(dayActions.resetSelection());
    //reset selected box
    resetSelectedBox();
    //close form
    onCloseForm();
  };
  let renderYear = () => {
    let surplus = yearForSelection % 10;
    let startYearToRender = yearForSelection - surplus;
    let result = [];
    for (let i = 0; i < 12; i++) {
      if (i != 11) {
        result.push(
          <div
            className="yearElement monthNameBox"
            onClick={(e) => {
              setYear(startYearToRender + i, e);
            }}
          >
            <div className="text">{startYearToRender + i}</div>
          </div>
        );
      } else {
        result.push(
          <div
            className="notThisDecade"
            onClick={(e) => {
              dispatch(dayActions.setYear(startYearToRender + i));
            }}
          >
            <div className="text">{startYearToRender + i}</div>
          </div>
        );
      }
    }
    return result;
  };
  let goToPreviousDecade = () => {
    dispatch(dayActions.previousYearForSelection());
  };
  let goToNextDecade = () => {
    dispatch(dayActions.nextYearForSelection());
  };
  return (
    <Fragment>
      <div className="chooseDayBoxWrapper" id="chooseDayBoxWrapper" {...props}>
        <div className="navigationOfBox">
          <div className="tabs" onClick={() => moveLineTo(1)}>
            Month
          </div>
          <div className="tabs" onClick={() => moveLineTo(2)}>
            Year
          </div>
          <div className="downSideLine" id="downSideLine"></div>
        </div>
        <div className="content" id="content">
          <div className="monthContent"> {renderMonth()}</div>
          <div className="yearContent">
            <div className="selectionArea">
              <div className="yearSelectionBox">{renderYear()}</div>
              <div className="chooseDecadeArea">
                <div
                  className="previousButton"
                  onClick={() => goToPreviousDecade()}
                >
                  <ArrowDropUpRoundedIcon className="upIcon" />
                </div>
                <div className="nextButton" onClick={() => goToNextDecade()}>
                  <ArrowDropDownRoundedIcon className="downIcon" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="currentSelectionNavigation">
          {monthSelected == null ? "..." : monthSelected} -
          {yearSelected == null ? " ..." : " " + yearSelected}
        </div>
      </div>
      <div className="confirmButtonWrapper">
        <Button
          variant="contained"
          color="secondary"
          className="cancelButton"
          onClick={() => onCancel()}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          className="confirmButton"
          onClick={() => onConfirm()}
          disabled={isDisableConfirmButton}
        >
          Confirm
        </Button>
      </div>
    </Fragment>
  );
}

export default ChooseDayBox;
