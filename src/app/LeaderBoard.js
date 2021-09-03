import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../features/users/usersSlice";

const LeaderBoard = () => {
  const users = useSelector(selectAllUsers);
  let leaderboard = Object.values(users).map((user) => {
    let answeredCount = Object.keys(user.answers).length;
    let askedCount = user.questions.length;
    let total = answeredCount + askedCount;
    return {
      name: user.name,
      avatarURL: user.avatarURL,
      answeredCount,
      askedCount,
      total,
    };
  });
  leaderboard.sort((user1, user2) => user2.total - user1.total);

  let content = leaderboard.map((user) => {
    return (
      <div className="leaderboard-container">
        <div className="leaderboard-inner-container">
          <img className="leaderboard-avatar" src={user.avatarURL} />
          <div className="leaderboard-name">
            <h3>{user.name}</h3>
          </div>
          <div className="leaderboard-answered">
            <div className="answered-text">Answered questions:</div>
            <div className="answered-score">{user.answeredCount}</div>
          </div>
          <div className="leaderboard-asked">
            <div className="answered-text">Created questions:</div>
            <div className="answered-score">{user.askedCount}</div>
          </div>
          <div className="leader-board-score">
            <div className="inner-score">
              <span>{user.total}</span>
            </div>
            <div className="inner-score-heading">Score</div>
          </div>
        </div>
      </div>
    );
  });
  return content;
};

export default LeaderBoard;
