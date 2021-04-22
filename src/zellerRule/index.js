function isLeap(year) {
  if (year % 4 || (year % 100 === 0 && year % 400)) return 0;
  else return 1;
}
function daysIn(month, year) {
  return month === 2 ? 28 + isLeap(year) : 31 - (((month - 1) % 7) % 2);
}
export default function calendar(month, year) {
  let startIndex = new Date(year, month - 1, 1).getDay() + 1;
  let beforeStartIndex;

  if (month != 1) {
    beforeStartIndex = daysIn(month - 1, year);
  } else if (month === 1) {
    beforeStartIndex = daysIn(12, year - 1);
  }
  let endIndex = daysIn(month, year);
  let afterMonthStartPos = startIndex + endIndex - 1;
  let result = Array.apply(0, Array(42)).map(function () {
    return 0;
  });
  for (let i = startIndex; i < endIndex + startIndex; i++) {
    result[i - 1] = i - startIndex + 1;
  }
  // console.log("beforeStartIndex :", beforeStartIndex);
  // console.log("startIndex :", startIndex);
  for (let i = 0; i < startIndex - 1; i++) {
    result[i] = beforeStartIndex - startIndex + 2 + i;
    result[i] += "n";
  }
  // console.log("afterMonthStartPos : ", afterMonthStartPos);
  for (
    let i = afterMonthStartPos, count = 1;
    count <= 42 - afterMonthStartPos;
    i++, count++
  ) {
    result[i] = count + "n";
  }
  return result;
}

// ------------------------------------------------------------
// let monthArray = calendar(4, 2021);
// console.log("-----------------------------------------");
// for (let i = 0; i < 6; i++) {
//   let result = "";
//   for (let j = 0; j < 7; j++) {
//     result = result + monthArray[i * 7 + j] + "\t";
//   }
//   console.log(result);
// }
