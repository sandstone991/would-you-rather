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
import {
  selectAllUsers,
  selectCurrentUser,
} from "../features/users/usersSlice";
import Questions from "./Questions";
const override = css`
  display: block;
  margin-top: 300px;
`;
const Home = () => {
  let currentUser = useSelector(selectCurrentUser);
  let users = useSelector(selectAllUsers);
  let status = useSelector(selectCurrnetStatus);
  let questions = useSelector(selectQuestions);
  const [{ answered, unanswered }, setActive] = useState({
    answered: "active-questions",
    unanswered: "inactive-qustions",
  });
  const [{ answeredQuestionsIds, unansweredQuestionsIds }, setQuestionIds] =
    useState({
      answeredQuestionsIds: [],
      unansweredQuestionsIds: [],
    });
  const dispatch = useDispatch();

  //toggle between answered and unaswered questions

  const handdleToggleQuestions = () => {
    setActive({
      answered: unanswered,
      unanswered: answered,
    });
  };
  useEffect(() => {
    if (status === "idle") {
      dispatch(getQuestions());
    } else if (status === "success") {
      setQuestionIds((state) => ({
        ...state,
        unansweredQuestionsIds: Object.keys(currentUser.answers).map(
          (answer) => answer
        ),
      }));
      setQuestionIds((state) => ({
        ...state,
        answeredQuestionsIds: Object.keys(questions).filter(
          (key) => !unansweredQuestionsIds.includes(key)
        ),
      }));
    }
    // eslint-disable-next-line
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
          <Questions
            questionsIds={unansweredQuestionsIds}
            questions={questions}
            users={users}
          />
        </div>
      );
    }
  } else {
    return <Redirect to="/login" />;
  }
};

export default Home;
