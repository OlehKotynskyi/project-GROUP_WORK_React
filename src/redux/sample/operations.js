//import { createAsyncThunk } from '@reduxjs/toolkit';
//import axios from 'axios';

//axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

//export const fetchContacts = createAsyncThunk(
//  'contacts/fetchAll',
//  async (_, thunkAPI) => {
//    try {
//      const response = await axios.get('/contacts');
//      return response.data;
//    } catch (error) {
//      return thunkAPI.rejectWithValue(error.message);
//    }
//  }
//);

//export const addContact = createAsyncThunk(
//  'contacts/addContacts',
//  async (contact, thunkAPI) => {
//    try {
//      const response = await axios.post('/contacts', contact);
//      return response.data;
//    } catch (error) {
//      return thunkAPI.rejectWithValue(error.message);
//    }
//  }
//);

//export const deleteContact = createAsyncThunk(
//  'contacts/deleteContacts',
//  async (contactsId, thunkAPI) => {
//    try {
//      const response = await axios.delete(`/contacts/${contactsId}`);
//      return response.data;
//    } catch (error) {
//      return thunkAPI.rejectWithValue(error.message);
//    }
//  }
//);

//export const updateContact = createAsyncThunk(
//  'contacts/updateContacts',
//  async (contact, thunkAPI) => {
//    try {
//      const response = await axios.patch(`/contacts/${contact.id}`, {
//        name: contact.name,
//        number: contact.number,
//      });
//      return response.data;
//    } catch (error) {
//      return thunkAPI.rejectWithValue(error.message);
//    }
//  }
//);
