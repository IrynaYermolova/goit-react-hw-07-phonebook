import { createSelector } from '@reduxjs/toolkit';
import { selectContacts } from './contacts/contactSelectors';
import { selectFilter } from './filter/filterSelectors';

export const selectVisibleContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    if (!contacts) return;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);