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
    createUser: () => {
      return {
        id: "",
        firstName: "",
        surName: "",
        phone: "",
        email: "",
        notes: "",
      };
    },
  },
});

export const { chooseUser, createUser } = userSlice.actions;
export default userSlice.reducer;
