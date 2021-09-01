import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectQuestions } from "../features/questions/questionsSlice";
import {
  selectAllUsers,
  selectCurrentUser,
} from "../features/users/usersSlice";
const Question = () => {
  const { id } = useParams();
  console.log("id", id);
  const questions = useSelector(selectQuestions);

  const currentUser = useSelector(selectCurrentUser);
  const users = useSelector(selectAllUsers);
  const question = questions[id];
  const asker = users[question.author];
  const [submitOption, setOption] = useState("optionOne");
  const handleChoice = (e) => {
    setOption(e.target.value);
  };
  const handleSubmit = () => {
    //dispatch sutff
  };
  return (
    <div className="container-question-answer">
      <div className="question-answer-container">
        <div className="answer-question-asked-by">{`${asker.name} asks:`}</div>
        <img className="answer-question-user-avatar" src={asker.avatarURL} />
        <div className="answer-question-header">
          <h4>Would you rather</h4>
        </div>
        <div className="answer-option-1">
          <div className="radio-option ">
            <input
              type="radio"
              id="optionOne"
              value="optionOne"
              name="option"
              onChange={handleChoice}
            />
          </div>
          <div className="answer-question-text">
            {" "}
            <label for="optionOne">{question.optionOne.text}</label>
          </div>
        </div>
        <div className="answer-option-2">
          <div className="radio-option ">
            <input
              type="radio"
              id="optionTwo"
              value="optionTwo"
              name="option"
              onChange={handleChoice}
            />
          </div>
          <div className="answer-question-text">
            <label for="optionTwo">{question.optionTwo.text}</label>
          </div>
        </div>
        <div className="answer-question-button">
          <button handleSubmit={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};
export default Question;
