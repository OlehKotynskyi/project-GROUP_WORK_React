//import { configureStore } from '@reduxjs/toolkit';
//import {
//  persistStore,
//  persistReducer,
//  FLUSH,
//  REHYDRATE,
//  PAUSE,
//  PERSIST,
//  PURGE,
//  REGISTER,
//} from 'redux-persist';

//якщо треба використовувати локал сторедж образець
//import storage from 'redux-persist/lib/storage';
//const authPersistConfig = {
//  key: '',
//  storage,
//  whitelist: [''],
//};

//export const store = configureStore({
//  reducer: {
//    auth:'',
//    filters: '',
//    contacts: '',
//  },
//  middleware: getDefaultMiddleware =>
//    getDefaultMiddleware({
//      serializableCheck: {
//        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//      },
//    }),
//});

//export const persistor = persistStore(store);
