import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TIsAuth } from '@/types';

const initialState: TIsAuth = {
  isAuth: false,
};

const isAuthSlice = createSlice({
  name: 'isAuth',
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const { setIsAuth } = isAuthSlice.actions;

export const selectIsAuth = (state: { isAuth: TIsAuth }): boolean => state.isAuth.isAuth;

export default isAuthSlice.reducer;
