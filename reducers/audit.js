import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: null,
};

export const auditSlice = createSlice({
  name: 'audit',
  initialState,
  reducers: {
    loadAudit: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { loadAudit } = auditSlice.actions;
export default auditSlice.reducer;