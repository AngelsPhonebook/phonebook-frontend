import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ContactProps } from "../type/typeUser";

const initialState: { isOpen: boolean; user: ContactProps | null } = {
  isOpen: false,
  user: null,
};

export const modalSlice = createSlice({
  name: "modalWindow",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ContactProps>) => {
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
