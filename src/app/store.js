import { configureStore } from "@reduxjs/toolkit";

//? reducers
import postsSlice from "../features/posts/postsSlice";
import userSlice from "../features/users/userSlice";

export const store = configureStore({
  reducer: { posts: postsSlice, users: userSlice },
});
