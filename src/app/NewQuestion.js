import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  postQuestion,
  selectStatusAdd,
} from "../features/questions/questionsSlice";
import { selectCurrentUser } from "../features/users/usersSlice";
import LoadingBar from "./LoadingBar";
const NewQuestion = () => {
  const [options, setOptions] = useState({
    option1: "",
    option2: "",
  });
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const author = currentUser.id;
  const handleChange = (e) => {
    if (e.target.name === "option1") {
      setOptions((state) => ({
        ...state,
        option1: e.target.value,
      }));
    } else {
      setOptions((state) => ({
        ...state,
        option2: e.target.value,
      }));
    }
  };
  const isDisabled = () => {
    if (options.option2 === "" || options.option1 === "") {
      return true;
    }
    return false;
  };
  const handleSubmit = () => {
    dispatch(
      postQuestion({
        author: author,
        optionOneText: options.option1,
        optionTwoText: options.option2,
      })
    );
  };
  const addStatus = useSelector(selectStatusAdd);
  useEffect(() => {}, [addStatus, dispatch]);
  if (addStatus === "idle") {
    return (
      <div className="add-container">
        <div className="add-header">
          <h2>Create New Question</h2>
        </div>
        <div className="add-instructions">Complete The Question</div>
        <div className="add-text">
          <h3>Would You Rather</h3>
        </div>
        <input
          type="text"
          value={options.option1}
          name="option1"
          onChange={handleChange}
          className="add-input-1"
          placeholder="Enter option one here"
        />
        <input
          type="text"
          value={options.option2}
          name="option2"
          onChange={handleChange}
          className="add-input-2"
          placeholder="Enter option two here"
        />
        <span className="add-or">
          <h3>OR</h3>
        </span>
        <div className="add-submit">
          <button disabled={isDisabled()} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    );
  } else if (addStatus === "loading") {
    return <LoadingBar />;
  } else if (addStatus === "success") {
    return <Redirect to="/home" />;
  }
};
export default NewQuestion;
