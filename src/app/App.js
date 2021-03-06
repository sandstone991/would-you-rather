import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useSelector } from "react-redux";
import "../App.css";
import { Login } from "./login";
import Home from "./Home";
import NotFound from "./NotFound";
import Question from "./Question";
import NavBar from "./NavBar";
import { selectCurrentUser } from "../features/users/usersSlice";
import NewQuestion from "./NewQuestion";
import LeaderBoard from "./LeaderBoard";
function App() {
  let currentUser = useSelector(selectCurrentUser);
  return (
    <Router>
      <Route
        path="/"
        render={() => {
          return (
            <>
              <NavBar key="navbar" />{" "}
              <Redirect
                to={{
                  pathname: "/login",
                }}
              />
            </>
          );
        }}
      />
      <Switch>
        <Route exact path="/login" key="login" component={Login} />
        <Route exact path="/home" key="home" component={Home} />
        <Route
          exact
          path="/questions/:id/:isAnswered"
          render={() =>
            currentUser ? (
              <Question />
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                }}
              />
            )
          }
        />
        <Route
          exact
          path="/add"
          render={() =>
            currentUser ? (
              <NewQuestion />
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                }}
              />
            )
          }
        />
        <Route
          exact
          path="/leaderboard"
          render={() =>
            currentUser ? (
              <LeaderBoard />
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                }}
              />
            )
          }
        />

        <Route path="*" key="notfound" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
