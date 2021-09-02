import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  postQuestionAnswer,
  selectCurrentPostStatus,
  selectCurrnetStatus,
  selectQuestions,
} from "../features/questions/questionsSlice";
import {
  selectAllUsers,
  selectCurrentUser,
  selectStatus,
  voteCurrentUser,
} from "../features/users/usersSlice";
import LoadingBar from "./LoadingBar";
const UnansweredQuestion = (props) => {
  const { id } = props;
  const dispatch = useDispatch();
  const questions = useSelector(selectQuestions);
  const currentUser = useSelector(selectCurrentUser);
  const users = useSelector(selectAllUsers);
  const postStatus = useSelector(selectCurrentPostStatus);
  const questionsStatus = useSelector(selectCurrnetStatus);
  const question = questions[id];
  const asker = users[question.author];
  const [submitOption, setOption] = useState("optionOne");
  const handleChoice = (e) => {
    setOption(e.target.value);
  };
  const handleSubmit = () => {
    let userId = currentUser.id;
    dispatch(voteCurrentUser({ id, submitOption }));
    dispatch(
      postQuestionAnswer({ authedUser: userId, qid: id, answer: submitOption })
    );
  };
  useEffect(() => {}, [questionsStatus, dispatch]);
  if (postStatus === "loading") {
    return <LoadingBar />;
  } else if (postStatus === "success") {
    return <Redirect to={`/questions/${id}/${true}`} />;
  } else {
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
              <label htmlFor="optionOne">{question.optionOne.text}</label>
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
              <label htmlFor="optionTwo">{question.optionTwo.text}</label>
            </div>
          </div>
          <div className="answer-question-button">
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    );
  }
};

export default UnansweredQuestion;
