import React from "react";

import { useParams } from "react-router-dom";

import UnansweredQuestion from "./UnansweredQuestion";
const Question = () => {
  const { id, isAnswered } = useParams();
  if (isAnswered === "true") {
    return <div>Under Development</div>;
  } else if (isAnswered === "false") {
    return <UnansweredQuestion id={id} />;
  }
};
export default Question;
