import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import NavBar from "./app/NavBar";
import { Login } from "./app/login";
import Home from "./app/Home";
import NotFound from "./app/NotFound";
import Question from "./app/Question";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Route
          path="/"
          render={() => {
            return (
              <>
                <NavBar key="navbar" /> <Redirect to="home" />
              </>
            );
          }}
        />
        <Switch>
          <Route exact path="/login" key="login" component={Login} />
          <Route exact path="/home" key="home" component={Home} />
          <Route exact path="/questions/:id" component={Question} />
          <Route path="*" key="notfound" component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
