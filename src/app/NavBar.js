import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
function NavBar() {
  return (
    <div className="container topnav">
      <div className="link-1 nav-bar-link">
        <Link to="/home">Home</Link>
      </div>
      <div className="link-2 nav-bar-link">
        <Link to="/newquestion">New Question</Link>
      </div>
      <div className="link-3 nav-bar-link">
        <Link to="/leaderboard">Leader Board</Link>
      </div>
      {
        //Add Status to fetching the information for the navbar
        true ? (
          <>
            <span className="profile-info">Hi, Ahmed Azzam</span>
            <img
              src="https://api.minimalavatars.com/avatar/random/svg"
              className="avatar profile-img"></img>
            <div className="link-4 nav-bar-link">
              <Link to="login/:loggedout">Logout</Link>
            </div>
          </>
        ) : null
      }
    </div>
  );
}

export default NavBar;
