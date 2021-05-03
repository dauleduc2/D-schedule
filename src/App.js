import { Grid } from "@material-ui/core";
import "./App.css";
import Navigation from "./components/Navigation/index";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SchedulePage from "./container/SchedulePage";
import EventsPage from "./components/EventsPage";
import SideBar from "./components/SideBar";
import GrayLayer from "./components/GrayLayer";
import ChooseDayBox from "./container/ChooseDayBox";
import DaySchedule from "./components/DaySchedule";
import { useSelector, useDispatch } from "react-redux";
import * as monthTransform from "./commons/monthFunc";
import AddPage from "./components/AddPage";
import * as dayActions from "./actions/dayActions";

function App() {
  const dispatch = useDispatch();
  let closeGrayLayer = () => {
    let grayLayer = document.getElementById("grayLayerWrapper");
    let chooseDayBox = document.getElementById("chooseDayBoxWrapper");
    let confirmButtonWrapperElement = document.getElementsByClassName(
      "confirmButtonWrapper"
    );
    let addPage = document.getElementsByClassName("addPageWrapper");
    if (addPage) {
      addPage[0].style.display = "none";
    }
    if (grayLayer) {
      grayLayer.style.display = "none";
    }
    if (chooseDayBox) {
      chooseDayBox.style.display = "none";
    }
    if (confirmButtonWrapperElement) {
      confirmButtonWrapperElement[0].style.display = "none";
    }
    dispatch(dayActions.setDay(null));
    dispatch(dayActions.setMonth(null));
    dispatch(dayActions.setYear(null));
  };
  const day = useSelector((state) => state.day.day);
  const month = useSelector((state) => state.day.month);
  const year = useSelector((state) => state.day.year);
  const dayWeek = useSelector((state) => state.day.dayWeek);
  const daySelected = useSelector((state) => state.day.daySelected);
  const monthSelected = useSelector((state) => state.day.monthSelected);
  const yearSelected = useSelector((state) => state.day.yearSelected);
  const daySchedule = useSelector((state) => state.daySchedule.daySchedule);
  const editting = useSelector((state) => state.daySchedule.editting);
  const dataEditting = useSelector((state) => state.daySchedule.dataEditting);
  // console.log(daySchedule);
  let monthText = monthTransform.changeMonthNumberToWord(month);
  let renderContent = () => {
    return (
      <Switch>
        <Route path="/" exact>
          <SchedulePage />
          <DaySchedule
            day={day}
            monthText={monthText}
            month={month}
            year={year}
            dayWeek={dayWeek}
            daySelected={daySelected}
            monthSelected={monthSelected}
            yearSelected={yearSelected}
            daySchedule={daySchedule}
          />
        </Route>
        <Route path="/events" exact>
          <EventsPage />
        </Route>
      </Switch>
    );
  };
  return (
    <Router>
      <Grid container direction="column">
        <Grid item xs={12}>
          <Navigation />
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={10} className="mainContentWrapper">
            {renderContent()}
          </Grid>
          <Grid item xs={2}>
            <SideBar />
          </Grid>
        </Grid>
      </Grid>
      <ChooseDayBox openning={false} onCloseForm={closeGrayLayer} />
      <GrayLayer onClick={closeGrayLayer} />
      <AddPage
        daySelected={daySelected}
        monthSelected={monthSelected}
        yearSelected={yearSelected}
        editting={editting}
        dataEditting={dataEditting}
      />
    </Router>
  );
}

export default App;
