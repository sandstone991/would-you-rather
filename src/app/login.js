import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, selectAllUsers } from "../features/users/usersSlice";
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin-top: 300px;
`;
export const Login = () => {
  const [selectValue, setSelectValue] = useState("none");
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.users.status);
  const users = useSelector(selectAllUsers);

  const errHappened = useSelector((state) => state.users.error);
  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(getUsers());
    }
  }, [userStatus, dispatch]);

  let content = <div></div>;
  if (userStatus === "loading") {
    content = (
      <div className="login-container">
        <BarLoader color={"#36D7B7"} height={5} width={200} css={override} />
      </div>
    );
  } else if (userStatus === "success") {
    content = (
      <div className="login-container">
        <div className="login">
          <div className="login-header">Welcome to would you rather game!</div>
          <div className="login-instruct">Please sign in to continue</div>
          <div className="inner-login-container">
            <span className="login-word">Sign in</span>
            <select className="login-select" value={selectValue}>
              <option value={"none"} disabled>
                Select a user
              </option>
              {Object.values(users).map((value) => (
                <option key={value.id} value={value.id}>
                  {value.name}
                </option>
              ))}
            </select>
            <button className="login-button">Sign in</button>
          </div>
        </div>
      </div>
    );
  }
  return content;
};
