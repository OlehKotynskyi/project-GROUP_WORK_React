//import { createSelector } from '@reduxjs/toolkit';

//export const selectContacts = state => state.contacts.items;

//export const selectFilters = state => state.filters;

//export const selectIsError = state => state.contacts.isError;

//export const selectIsLoading = state => state.contacts.isLoading;

//export const selectVisibleContacts = createSelector(
//  [selectContacts, selectFilters],
//  (contacts, filter) => {
//    return contacts.filter(
//      contact =>
//        contact.name.toLowerCase().trim().includes(filter.toLowerCase()) ||
//        contact.number.includes(filter)
//    );
//  }
//);
