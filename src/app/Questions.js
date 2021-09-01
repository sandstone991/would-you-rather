import React from "react";
const Questions = (props) => {
  const { questions, users, questionsIds } = props;
  return (
    <>
      {questionsIds.map((id) => {
        let user = users[questions[id].author];
        return (
          <div className="question-home-container" key={id}>
            <div className="home-question-asked-by">{user.name} asks:</div>
            <img
              className="home-question-user-avatar"
              src={user.avatarURL}
              alt={`${user.name}'s avatar`}
            />
            <div className="home-question-header">
              <h4>Would you rather</h4>
            </div>
            <div className="home-question-content">
              ...{questions[id].optionOne.text}...
            </div>
            <div className="home-qustion-button">
              <button>View Poll</button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Questions;