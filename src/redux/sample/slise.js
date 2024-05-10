//import { createSlice } from '@reduxjs/toolkit';
//import {
//  addContact,
//  deleteContact,
//  fetchContacts,
//  updateContact,
//} from './operations';

//const handlePending = state => {
//  state.isLoading = true;
//};

//const handleRejected = (state, action) => {
//  state.isLoading = false;
//  state.error = action.payload;
//};

//const contactsSlice = createSlice({
//  name: 'contacts',
//  initialState: {
//    items: [],
//    isLoading: false,
//    isError: null,
//  },
//  extraReducers: builder =>
//    builder
//      .addCase(fetchContacts.pending, handlePending)
//      .addCase(fetchContacts.fulfilled, (state, action) => {
//        state.isLoading = false;
//        state.isError = null;
//        state.items = action.payload;
//      })
//      .addCase(fetchContacts.rejected, handleRejected)
//      .addCase(deleteContact.pending, handlePending)
//      .addCase(deleteContact.fulfilled, (state, action) => {
//        state.isLoading = false;
//        state.items = state.items.filter(
//          contact => contact.id !== action.payload.id
//        );
//      })
//      .addCase(deleteContact.rejected, handleRejected)
//      .addCase(addContact.pending, handlePending)
//      .addCase(addContact.fulfilled, (state, action) => {
//        state.isLoading = false;
//        state.items = [...state.items, action.payload];
//      })
//      .addCase(addContact.rejected, handleRejected)
//      .addCase(updateContact.rejected, handleRejected)
//      .addCase(updateContact.pending, handlePending)
//      .addCase(updateContact.fulfilled, (state, action) => {
//        state.isLoading = false;
//        state.items = state.items.map(item => {
//          return item.id === action.payload.id ? action.payload : item;
//        });
//      }),
//});

//export default { contactsReducer: contactsSlice.reducer };
