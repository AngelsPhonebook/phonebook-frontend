import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modalWindow",
  initialState: { isOpen: false },
  reducers: {
    handleOpenModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { handleOpenModal } = modalSlice.actions;
export default modalSlice.reducer;
