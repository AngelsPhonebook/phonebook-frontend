import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
  },
});
