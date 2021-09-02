import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from "../../_DATA";

let initialState = {
  list: {},
  status: "idle",
  postStatus: "idle",
  postAddStatus: "idle",
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
  async (obj) => {
    let response = await _saveQuestionAnswer(obj);
    response = await _getQuestions();
    return response;
  }
);
export const postQuestion = createAsyncThunk(
  "questions/postQuestions",
  async (obj) => {
    let response = await _saveQuestion(obj);
    response = await _getQuestions();
    return response;
  }
);
const questionsSlice = createSlice({
  name: "questions",
  initialState,

  reducers: {
    resetPostStatus: (state, action) => {
      state.postStatus = "idle";
    },
    resetAddStatus: (state) => {
      state.postAddStatus = "idle";
    },
  },
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
      .addCase(postQuestionAnswer.pending, (state) => {
        state.postStatus = "loading";
      })
      .addCase(postQuestionAnswer.fulfilled, (state, { payload }) => {
        state.postStatus = "success";
        state.list = payload;
      })
      .addCase(postQuestion.pending, (state, action) => {
        state.postAddStatus = "loading";
      })
      .addCase(postQuestion.fulfilled, (state, { payload }) => {
        state.postAddStatus = "success";
        state.list = payload;
      });
  },
});
export const { resetPostStatus, resetAddStatus } = questionsSlice.actions;
export const selectCurrentPostStatus = (state) => state.questions.postStatus;
export const selectCurrnetStatus = (state) => state.questions.status;
export const selectQuestions = (state) => state.questions.list;
export const selectStatusAdd = (state) => state.questions.postAddStatus;
export default questionsSlice.reducer;
