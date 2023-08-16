import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; 
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import cartReducer from './cartSlice';

const userPersistConfig = {
  key: 'user',
  version: 1,
  storage,
  // blacklist: ['users'],

};

const cartPersistConfig = {
  key: 'cart',
  version: 1,
  storage,
  // blacklist: ['items'],
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  cart: persistReducer(cartPersistConfig, cartReducer),
});

export const store = configureStore({
  reducer: rootReducer,
});

