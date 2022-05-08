import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";
// const USERS_URL = "http://localhost:8000/users";

const initialState = [];

//? impure actions
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(USERS_URL);
  return response.data;
});

//? slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => action.payload);
  },
});

//? selectors
export const selectAllUsers = (state) => state.users;
export const selectUserById = (state, userId) =>
  state.users.find((user) => user.id === userId);

export default usersSlice.reducer;
