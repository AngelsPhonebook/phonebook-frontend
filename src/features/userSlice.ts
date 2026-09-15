import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "currentUser",
  initialState: {
    id: 0,
    name: "string",
    surname: "string",
    phone: "string",
    email: "string",
    notes: "string",
  },
  reducers: {
    chooseUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { chooseUser } = userSlice.actions;
export default userSlice.reducer;
