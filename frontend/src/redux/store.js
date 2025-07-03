// store.js
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import jobSlice from './jobSlice';
import companySlice from './companySlice'
import applicationSlice from './applicationSlice'

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice,
  job: jobSlice, // ✅ added jobSlice
  company:companySlice,
  application:applicationSlice
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // necessary for redux-persist
    }),
});

export const persistor = persistStore(store);
export default store;
