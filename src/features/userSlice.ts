import { createSlice } from "@reduxjs/toolkit";
import type { ContactProps } from "../type/typeUser";

const initialState: ContactProps | null = null;

export const userSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    chooseUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { chooseUser } = userSlice.actions;
export default userSlice.reducer;
