import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import activeUserSlice from './slices/activeUserSlice';
import filterOptionsSlice from './slices/filterOptionsSlice';
import isAuthSlice from './slices/isAuthSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  activeUser: activeUserSlice,
  isAuth: isAuthSlice,
  filterOptions: filterOptionsSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export default store;
