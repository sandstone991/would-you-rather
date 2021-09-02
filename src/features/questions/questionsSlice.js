import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getQuestions, _saveQuestionAnswer } from "../../_DATA";
let initialState = {
  list: {},
  status: "idle",
  error: null,
};

export const getQuestions = createAsyncThunk(
  "questions/getQuestions",
  async () => {
    let response = await _getQuestions();
    return response;
  }
);

export const postQuestionAnswer = createAsyncThunk(
  "questions/postAnswer",
  async (authedUser, qid, answer) => {
    let response = await _saveQuestionAnswer(authedUser, qid, answer);
    return response;
  }
);

const questionsSlice = createSlice({
  name: "questions",
  initialState,

  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getQuestions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getQuestions.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.list = payload;
      })
      .addCase(getQuestions.rejected, (state, action) => {
        state.status = "failure";
        state.error = action.error.message;
      })
      .addCase(postQuestionAnswer.fulfilled,()=>{
        getQuestions()
      })
  },
});

export const selectCurrnetStatus = (state) => state.questions.status;
export const selectQuestions = (state) => state.questions.list;
export default questionsSlice.reducer;
