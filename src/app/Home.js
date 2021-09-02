import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
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
import LoadingBar from "./LoadingBar";
const Home = () => {
  const currentUser = useSelector(selectCurrentUser);
  let users = useSelector(selectAllUsers);
  let status = useSelector(selectCurrnetStatus);
  let questions = useSelector(selectQuestions);
  const [{ answered, unanswered }, setActive] = useState({
    answered: "inactive-questions",
    unanswered: "active-questions",
  });
  const [{ answeredQuestionsIds, unansweredQuestionsIds }, setQuestionIds] =
    useState({
      answeredQuestionsIds: [],
      unansweredQuestionsIds: [],
    });
  const dispatch = useDispatch();

  //toggle between answered and unaswered questions

  const handdleToggleUnanswered = () => {
    setActive({
      answered: "inactive-questions",
      unanswered: "active-questions",
    });
  };
  const handdleToggleAnswered = () => {
    setActive({
      answered: "active-questions",
      unanswered: "inactive-questions",
    });
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(getQuestions());
    } else if (status === "success") {
      setQuestionIds((state) => ({
        ...state,
        answeredQuestionsIds: Object.keys(currentUser.answers).map(
          (answer) => answer
        ),
      }));
      setQuestionIds((state) => ({
        ...state,
        unansweredQuestionsIds: Object.keys(questions).filter(
          (key) => !state.answeredQuestionsIds.includes(key)
        ),
      }));
    }
    // eslint-disable-next-line
  }, [status, dispatch]);

  if (currentUser) {
    if (status === "idle") {
      return <div></div>;
    } else if (status === "loading") {
      return <LoadingBar />;
    } else if (status === "success") {
      return (
        <div className="container-home">
          <div className="toggle-questions-contianer">
            <span
              className={`toggle-questions ${unanswered}`}
              onClick={handdleToggleUnanswered}>
              Unanswered Questions
            </span>
            <span
              className={`toggle-questions border-question ${answered}`}
              onClick={handdleToggleAnswered}>
              Answered Questions
            </span>
          </div>
          {unanswered === "active-questions" ? (
            <Questions
              questionsIds={unansweredQuestionsIds}
              questions={questions}
              isAnswered={false}
              users={users}
            />
          ) : (
            <Questions
              questionsIds={answeredQuestionsIds}
              questions={questions}
              isAnswered={true}
              users={users}
            />
          )}
        </div>
      );
    }
  } else {
    return <Redirect to="/login" />;
  }
};

export default Home;
