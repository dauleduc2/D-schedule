import { Typography } from "@material-ui/core";
import React from "react";
import "./style.css";
function SideBar() {
  return (
    <div className="sideBarWrapper">
      <Typography variant="h5" gutterBottom className="title">
        Incoming events
      </Typography>
    </div>
  );
}

export default SideBar;
