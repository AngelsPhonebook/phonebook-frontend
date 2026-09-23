import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modalWindow",
  initialState: { isOpen: false, user: undefined },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.user = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
