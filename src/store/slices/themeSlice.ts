import { createSlice } from '@reduxjs/toolkit';

type TThemeState = {
  mode: 'light' | 'dark';
};

const initialState: TThemeState = {
  mode: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
  },
});

export const selectTheme = (state: { theme: TThemeState }): 'dark' | 'light' => state.theme.mode;
export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
