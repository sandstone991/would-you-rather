import React from "react";
const NewQuestion = () => {
  return (
    <div class="add-container">
      <div class="add-header">
        <h2>Create New Question</h2>
      </div>
      <div class="add-instructions">Complete The Question</div>
      <div class="add-text">
        <h3>Would You Rather</h3>
      </div>
      <input
        type="text"
        name=""
        id=""
        class="add-input-1"
        placeholder="Enter option one here"
      />
      <input
        type="text"
        name=""
        id=""
        class="add-input-2"
        placeholder="Enter option two here"
      />
      <span class="add-or">
        <h3>OR</h3>
      </span>
      <div class="add-submit">
        <a href="">Submit</a>
      </div>
    </div>
  );
};
export default NewQuestion;
