import React from "react";
import { useParams } from "react-router-dom";
import AnsweredQuestion from "./AnsweredQuestion";

import UnansweredQuestion from "./UnansweredQuestion";
const Question = () => {
  const { id, isAnswered } = useParams();
  return isAnswered === "true" ? (
    <AnsweredQuestion id={id} />
  ) : (
    <UnansweredQuestion id={id} />
  );
};
export default Question;
