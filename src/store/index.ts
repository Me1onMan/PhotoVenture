import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import activeUserSlice from './slices/activeUserSlice';
import isAuthSlice from './slices/isAuthSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  activeUser: activeUserSlice,
  isAuth: isAuthSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export default store;
