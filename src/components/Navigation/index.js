import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";
function Navigation() {
  return (
    <div className="navigationWrapper">
      <div className="logo">
        <NavLink to="/">Dschedule</NavLink>
      </div>
      <ul className="nav-selection">
        <NavLink to="/" exact>
          <li>Schedule</li>
        </NavLink>
        <NavLink to="events" exact>
          <li>Events</li>
        </NavLink>
      </ul>
    </div>
  );
}

export default Navigation;
