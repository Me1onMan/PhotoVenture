import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TEmotions, TFilterOptions, TPostTypes } from '@/types';

const initialState: TFilterOptions = {
  types: [],
  emotions: [],
  access: [],
};

const filterOptionsSlice = createSlice({
  name: 'filterOptions',
  initialState,
  reducers: {
    addType: (state, action: PayloadAction<TPostTypes>) => {
      state.types.push(action.payload);
    },
    removeType: (state, action: PayloadAction<TPostTypes>) => {
      state.types.filter((postType) => postType !== action.payload);
    },
    addEmotion: (state, action: PayloadAction<TEmotions>) => {
      state.emotions.push(action.payload);
    },
    removeEmotion: (state, action: PayloadAction<TEmotions>) => {
      state.emotions.filter((emotion) => emotion !== action.payload);
    },
    addAccess: (state, action: PayloadAction<string>) => {
      state.access.push(action.payload);
    },
    removeAccess: (state, action: PayloadAction<string>) => {
      state.access.filter((accessWord) => accessWord !== action.payload);
    },
  },
});

export const selectFilterOptions = (state: { filterOptions: TFilterOptions }) =>
  state.filterOptions;
export const { addType, removeType, addEmotion, removeEmotion, addAccess, removeAccess } =
  filterOptionsSlice.actions;
export default filterOptionsSlice.reducer;
