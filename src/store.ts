import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./features/userSlice";
import modalReducer from "./features/modalSlice";
import contactsSliceReducer from "./features/contactsSlice";

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    modalWindow: modalReducer,
    contacts: contactsSliceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
