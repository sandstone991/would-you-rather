import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import {
  getUsers,
  selectAllUsers,
  changeCurrentUser,
  selectCurrentUser,
} from "../features/users/usersSlice";
import LoadingBar from "./LoadingBar";
export const Login = () => {
  let history = useHistory();
  const [selectValue, setSelectValue] = useState("none");
  const isDisabled = () => (selectValue === "none" ? true : false);
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.users.status);
  const users = useSelector(selectAllUsers);
  const currentUser = useSelector(selectCurrentUser);
  const handleSubmit = () => {
    dispatch(changeCurrentUser(users[selectValue]));
    history.push("/home");
  };

  //const errHappened = useSelector((state) => state.users.error);
  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(getUsers());
    }
  }, [userStatus, dispatch]);

  let content = <div></div>;
  if (userStatus === "loading") {
    content = <LoadingBar />;
  } else if (userStatus === "success") {
    content = (
      <div className="login-container">
        <div className="login">
          <div className="login-header">Welcome to would you rather game!</div>
          <div className="login-instruct">Please sign in to continue</div>
          <div className="inner-login-container">
            <span className="login-word">Sign in</span>
            <select
              className="login-select"
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}>
              <option value={"none"} disabled>
                Select a user
              </option>
              {Object.values(users).map((value) => (
                <option key={value.id} value={value.id}>
                  {value.name}
                </option>
              ))}
            </select>
            <button
              className="login-button"
              onClick={handleSubmit}
              disabled={isDisabled()}>
              Sign in
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (currentUser) {
    alert(`You're already logged in!`);
    return <Redirect to="home" />;
  } else {
    return content;
  }
};
