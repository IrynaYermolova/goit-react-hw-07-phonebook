// import { createSlice } from '@reduxjs/toolkit';
// import { nanoid } from 'nanoid';

// const contactSlice = createSlice({
//   name: 'contacts',
//   initialState: [],
//   reducers: {
//     addContact: {
//       reducer: (state, { payload }) => {
//         state.push(payload);
//       },
//       prepare: data => {
//         return { payload: { id: nanoid(), ...data } };
//       },
//     },
//     deleteContact: (state, { payload }) =>
//       state.filter(({ id }) => id !== payload),
//   },
// });

// export const { addContact, deleteContact } = contactSlice.actions;
// export default contactSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteContact,
} from 'redux/contacts/operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const handleFulfilled = state => {
  state.isLoading = false;
  state.error = null;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.contacts = payload;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.contacts.push(payload);
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.contacts = state.contacts.filter(
          contact => contact.id !== payload
        );
      })
      .addMatcher(action => action.type.endsWith('/pending'), handlePending)
      .addMatcher(action => action.type.endsWith('/rejected'), handleRejected)
      .addMatcher(
        action => action.type.endsWith('/fulfilled'),
        handleFulfilled
      );
  },
});

export const contactsReducer = contactsSlice.reducer;