import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/react";
import {
  getQuestions,
  selectCurrnetStatus,
  selectQuestions,
} from "../features/questions/questionsSlice";
import { selectCurrentUser } from "../features/users/usersSlice";
const override = css`
  display: block;
  margin-top: 300px;
`;
const Home = () => {
  let currentUser = useSelector(selectCurrentUser);
  let status = useSelector(selectCurrnetStatus);
  let questions = useSelector(selectQuestions);
  const [{ answered, unanswered }, setActive] = useState({
    answered: "active-questions",
    unanswered: "inactive-qustions",
  });
  const dispatch = useDispatch();

  //toggle between answered and unaswered questions

  const handdleToggleQuestions = (e) => {
    setActive({
      answered: unanswered,
      unanswered: answered,
    });
  };
  useEffect(() => {
    if (status === "idle") {
      dispatch(getQuestions());
    } else if (status === "success") {
      let unansweredQuestionsIds = Object.keys(currentUser.answers).map(
        (answer) => answer
      );
      let unansweredQuestions = unansweredQuestionsIds.map((id) => (
        <div className="question-home-container">
          <div className="home-question-asked-by">question[id].</div>
          <img
            className="home-question-user-avatar"
            src="https://api.minimalavatars.com/avatar/avatar/png"
          />
          <div className="home-question-header">
            <h4>Would you rather</h4>
          </div>
          <div className="home-question-content">...be a front-end...</div>
          <div className="home-qustion-button">
            <button>View Poll</button>
          </div>
        </div>
      ));
      let answerQuestionsIds = Object.keys(questions).filter(
        (key) => !unansweredQuestionsIds.includes(key)
      );
    }
  }, [status, dispatch]);
  if (currentUser) {
    if (status === "idle") {
      return <div></div>;
    } else if (status === "loading") {
      return (
        <div className="login-container">
          <BarLoader color={"#36D7B7"} height={5} width={200} css={override} />
        </div>
      );
    } else if (status === "success") {
      return (
        <div className="container-home">
          <div className="toggle-questions-contianer">
            <span
              className={`toggle-questions ${answered}`}
              onClick={handdleToggleQuestions}>
              Unanswered Questions
            </span>
            <span
              className={`toggle-questions border-question ${unanswered}`}
              onClick={handdleToggleQuestions}>
              Answered Questions
            </span>
          </div>
          <div className="question-home-container">
            <div className="home-question-asked-by">John Doe asks:</div>
            <img
              className="home-question-user-avatar"
              src="https://api.minimalavatars.com/avatar/avatar/png"
            />
            <div className="home-question-header">
              <h4>Would you rather</h4>
            </div>
            <div className="home-question-content">...be a front-end...</div>
            <div className="home-qustion-button">
              <button>View Poll</button>
            </div>
          </div>
        </div>
      );
    }
  } else {
    return <Redirect to="/login" />;
  }
};

export default Home;
