import { createSlice } from "@reduxjs/toolkit";
import type { ContactProps } from "../type/typeUser";

const initialState = null satisfies ContactProps | null;

export const userSlice = createSlice({
  name: "currentUser",
  initialState: initialState as ContactProps | null,
  reducers: {
    chooseUser: (_, action) => {
      return action.payload;
    },
    closeInfoUser: () => {
      return null;
    },
  },
});

export const { chooseUser, closeInfoUser } = userSlice.actions;
export default userSlice.reducer;
