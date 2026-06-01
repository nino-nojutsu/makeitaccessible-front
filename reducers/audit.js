import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const auditSlice = createSlice({
  name: 'violations',
  initialState,
  reducers: {
    loadViolations: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { loadViolations } = auditSlice.actions;
export default auditSlice.reducer;