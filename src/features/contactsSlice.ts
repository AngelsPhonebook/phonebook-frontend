import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ContactProps } from "../type/typeUser";
const API = "https://angels-shop.ru/phonebook/api";

type ContactState = {
  contacts: ContactProps[];
  loading: boolean;
  error: null | string;
};

export const fetchGetContacts = createAsyncThunk(
  "contacts/getContacts",
  async () => {
    const res = await fetch(`${API}/contacts`, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(`Ошибка в получении даных ${res.status}`);
    }
    const data = await res.json();
    return data;
  },
);

export const fetchUpdateContact = createAsyncThunk(
  "contacts/updateContact",
  async (user: ContactProps) => {
    const res = await fetch(`${API}/contacts/${user.id}`, {
      method: "PATCH",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!res.ok) {
      throw new Error(`Ошибка в обновлении данных ${res.ok}`);
    }
    const data = await res.json();
    return data;
  },
);

const initialState: ContactState = {
  contacts: [],
  loading: false,
  error: null,
};

export const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetContacts.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchGetContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = `Ошибка в получении данных ${action.error.message}`;
      })
      .addCase(fetchGetContacts.pending, (state) => {
        state.error = null;
        state.loading = true;
      })

      .addCase(fetchUpdateContact.fulfilled, (state, action) => {
        const changedContactIndex = state.contacts.findIndex(
          (contact) => contact.id === action.payload.id,
        );
        state.contacts.splice(changedContactIndex, 1, action.payload);
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchUpdateContact.rejected, (state, action) => {
        state.loading = false;
        state.error = `Ошибка в получении данных ${action.error.message}`;
      })
      .addCase(fetchUpdateContact.pending, (state) => {
        state.error = null;
        state.loading = true;
      });
  },
});

export default contactSlice.reducer;
