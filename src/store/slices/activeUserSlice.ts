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
    removeActiveUser(state) {
      state.entity = undefined;
    },
    setActiveUser(state, payload) {
      state.entity = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserByLogin.fulfilled, (state, action) => {
      state.entity = action.payload;
    });
  },
});

export const selectActiveUser = (state: { activeUser: { entity: TUserWOPassword } }) =>
  state.activeUser.entity;
export const { removeActiveUser, setActiveUser } = activeUserSlice.actions;
export default activeUserSlice.reducer;
