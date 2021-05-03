import React, { useEffect } from "react";
import ContextMenu from "../ContextMenu";
import "./style.css";
function DaySquare(props) {
  useEffect(() => {
    // remove all context menu when click anywhere in body element
    document.body.addEventListener("click", () => {
      let contextWrapperElement = document.getElementsByClassName(
        "contextMenuWrapper"
      );
      for (let i = 0; i < contextWrapperElement.length; i++) {
        const element = contextWrapperElement[i];
        element.style.display = "none";
      }
    });
  }, []);

  let { day, month, year, activeDay } = props;
  let dayToPrint = day;
  let classNameText = "squareOfDay";
  let checkDay = (day) => {
    if (typeof day === "string") {
      notThisMonth = true;
      let result = day.search("n");
      dayToPrint = day.slice(0, result);
    }
  };

  var notThisMonth;
  checkDay(day);

  let onHandleCLick = (e) => {
    e.preventDefault();
    // set selected month
    if (
      e.target.classList.contains("notThisMonth") === false &&
      e.target.classList.contains("selection") === false
    ) {
      let squareList = document.getElementsByClassName("squareOfDay");
      for (let i = 0; i < squareList.length; i++) {
        const element = squareList[i];
        element.classList.remove("selectedSquare");
      }
      e.target.classList.add("selectedSquare");
    }
  };
  if (notThisMonth == true) {
    classNameText = "notThisMonth";
  }
  if (activeDay == true) {
    classNameText += " activeDay selectedSquare";
  }

  //open context menu at where client clicked
  let onRightClick = (e) => {
    e.preventDefault();
    let contextWrapperElement = document.getElementsByClassName(
      "contextMenuWrapper"
    );
    for (let i = 0; i < contextWrapperElement.length; i++) {
      const element = contextWrapperElement[i];
      element.style.display = "none";
    }
    let squareOfDayElement = e.target;
    let contextMenuElement = squareOfDayElement.childNodes[1];
    if (contextMenuElement) {
      contextMenuElement.style.display = "flex";
      let { clientX, clientY } = e;
      let { offsetLeft, offsetTop } = e.target;

      // console.log(clientX, clientY);
      let contextMenuHeight = contextMenuElement.clientHeight;
      let pos = {
        left: clientX - offsetLeft,
        top: clientY - offsetTop - 50 - contextMenuHeight - 10,
      };
      contextMenuElement.style.left = pos.left + "px";
      contextMenuElement.style.top = pos.top + "px";
    }
  };

  return (
    <td
      className={classNameText}
      onClick={(e) => onHandleCLick(e)}
      onContextMenu={(e) => onRightClick(e)}
    >
      {dayToPrint}
      <ContextMenu day={day} month={month} year={year} />
    </td>
  );
}

export default DaySquare;
