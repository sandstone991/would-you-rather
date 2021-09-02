import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPostStatus,
  selectQuestions,
} from "../features/questions/questionsSlice";
import {
  selectAllUsers,
  selectCurrentUser,
} from "../features/users/usersSlice";

const AnsweredQuestion = (props) => {
  const { id } = props;
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const users = useSelector(selectAllUsers);
  const questions = useSelector(selectQuestions);
  const question = questions[id];
  const asker = users[question.author];
  //Votes count
  let voteOneCount = question.optionOne.votes.length;
  let voteTwoCount = question.optionTwo.votes.length;

  const totalVotes = voteOneCount + voteTwoCount;
  //Precentage
  const precentageOne = ((voteOneCount / totalVotes) * 100).toFixed(1);
  const precentageTwo = (100 - precentageOne).toFixed(1);
  //Current user's Answer
  const currentUserAnswer = currentUser.answers[id];
  const choseOptionOne = currentUserAnswer === "optionOne";

  return (
    <div className="question-answered-container">
      <div className="answered-question-asked-by">{`Asked by ${asker.name}`}</div>
      <img
        className="answered-question-user-avatar"
        src={asker.avatarURL}
        alt={`${asker.name}'s avatar`}
      />
      <div className="answered-question-header">
        <h2>Results:</h2>
      </div>
      <div
        className={`answered-result-1 ${
          choseOptionOne
            ? "answered-question-winner"
            : "answered-question-loser"
        }`}>
        {choseOptionOne ? (
          <span className="your-answer">Your Answer</span>
        ) : null}
        <div className="answered-result-text">{question.optionOne.text}</div>
        <div className="meter progress-bar" id="">
          <div style={{ width: `${precentageOne}%` }}>
            <span className="loading-bar progress">{`${precentageOne}%`}</span>
          </div>
        </div>
        <div className="answered-result-ratio">{`${voteOneCount} out of ${totalVotes}`}</div>
      </div>
      <div
        className={`answered-result-2 ${
          !choseOptionOne
            ? "answered-question-winner"
            : "answered-question-loser"
        }`}>
        {!choseOptionOne ? (
          <span className="your-answer">Your Answer</span>
        ) : null}
        <div className="answered-result-text">{question.optionTwo.text}</div>
        <div className="meter progress-bar" id="">
          <div style={{ width: `${precentageTwo}%` }}>
            <span className="loading-bar progress">{`${precentageTwo}%`}</span>
          </div>
        </div>
        <div className="answered-result-ratio">{`${voteTwoCount} out of ${totalVotes}`}</div>
      </div>
    </div>
  );
};
export default AnsweredQuestion;
