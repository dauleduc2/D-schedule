import React from "react";
import "./style.css";
function DaySquare(props) {
  let { day, activeDay } = props;
  let dayToPrint = day;
  let checkDay = (day) => {
    if (typeof day === "string") {
      notThisMonth = true;
      let result = day.search("n");
      dayToPrint = day.slice(0, result);
    }
  };

  var notThisMonth;
  {
    checkDay(day);
  }
  let selecDay = (e) => {
    if (e.target.className !== "notThisMonth") {
      let squareList = document.getElementsByClassName("squareOfDay");
      for (let i = 0; i < squareList.length; i++) {
        const element = squareList[i];
        element.classList.remove("selectedSquare");
      }
      e.target.classList.add("selectedSquare");
    }
  };
  let classNameText = "squareOfDay";
  if (notThisMonth == true) {
    classNameText = "notThisMonth";
  }
  if (activeDay == true) {
    classNameText += " activeDay selectedSquare";
  }
  return (
    <td className={classNameText} onClick={(e) => selecDay(e)}>
      {dayToPrint}
    </td>
  );
}

export default DaySquare;
