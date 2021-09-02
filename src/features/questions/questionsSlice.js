import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getQuestions, _saveQuestionAnswer } from "../../_DATA";

let initialState = {
  list: {},
  status: "idle",
  error: null,
  postStatus: "idle",
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

const questionsSlice = createSlice({
  name: "questions",
  initialState,

  reducers: {
    resetPostStatus: (state, action) => {
      state.postStatus = "idle";
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
      });
  },
});
export const { resetPostStatus } = questionsSlice.actions;
export const selectCurrentPostStatus = (state) => state.questions.postStatus;
export const selectCurrnetStatus = (state) => state.questions.status;
export const selectQuestions = (state) => state.questions.list;
export default questionsSlice.reducer;
