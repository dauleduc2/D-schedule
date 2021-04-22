import { Grid } from "@material-ui/core";
import "./App.css";
import Navigation from "./components/Navigation/index";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SchedulePage from "./container/SchedulePage";
import EventsPage from "./components/EventsPage";
import SideBar from "./components/SideBar";
import GrayLayer from "./components/GrayLayer";
import ChooseDayBox from "./container/ChooseDayBox";
function App() {
  let closeGrayLayer = () => {
    let grayLayer = document.getElementById("grayLayerWrapper");
    let chooseDayBox = document.getElementById("chooseDayBoxWrapper");
    let confirmButtonWrapperElement = document.getElementsByClassName(
      "confirmButtonWrapper"
    );
    grayLayer.style.display = "none";
    chooseDayBox.style.display = "none";
    confirmButtonWrapperElement[0].style.display = "none";
  };
  let renderContent = () => {
    return (
      <Switch>
        <Route path="/" exact>
          <SchedulePage />
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
          <Grid item xs={10}>
            {renderContent()}
          </Grid>
          <Grid item xs={2}>
            <SideBar />
          </Grid>
        </Grid>
      </Grid>
      <ChooseDayBox openning={false} onCloseForm={closeGrayLayer} />
      <GrayLayer
      //  onClick={closeGrayLayer}
      />
    </Router>
  );
}

export default App;
