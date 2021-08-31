import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getUsers } from "../../_DATA";
let initialState = {
  list: {},
  status: "idle",
  error: null,
};

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  let response = await _getUsers();
  return response;
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //If fullfilled dispatch an action called 'fulfilled' which will just return the data
    builder
      .addCase(getUsers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.list = payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = "failure";
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;

export const selectAllUsers = (state) => state.users.list;
