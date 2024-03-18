import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import getUserAndLogin from '@/firebase/actions/getUserAndLogin';
import { TUser, TUserWOPassword } from '@/types';

export const fetchUserByLogin = createAsyncThunk(
  'activeUser/fetchByLogin',
  async ({ login, password }: Pick<TUser, 'login' | 'password'>) => {
    const user: TUserWOPassword = await getUserAndLogin(login, password);
    return user;
  },
);

type TUserState = {
  entity: TUserWOPassword;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
};

const initialState = {
  entity: undefined,
  loading: 'idle',
} satisfies TUserState;

const activeUserSlice = createSlice({
  name: 'activeUser',
  initialState,
  reducers: {
    removeUser(state) {
      state.entity = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserByLogin.fulfilled, (state, action) => {
      state.entity = action.payload;
    });
  },
});

export const { removeUser } = activeUserSlice.actions;
export default activeUserSlice.reducer;
