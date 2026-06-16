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
    validateTest: (state, action) => {
      // Mets à jour le tableau tests d'un audit (attention !! state.value = state audit qui contient une propriété audit => à ne pas)
      state.value.audit.tests.map(test => test._id === action.payload);
    }
  },
});

export const { loadAudit, validateTest } = auditSlice.actions;
export default auditSlice.reducer;