import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: null,
};

export const auditSlice = createSlice({
  name: 'audit',
  initialState,
  reducers: {
    loadAudit: (state, action) => {
      state.value.results = action.payload.results;
      state.value.tests = action.payload.tests;
      state.value.website = action.payload.results;
    },
    validateTest: (state, action) => {
      // Mets à jour le tableau tests d'un audit (attention !! state.value = state audit qui contient une propriété audit => à ne pas)
      const testsList = state.value.audit.tests.map(test => {
        if (test._id === action.payload) {
          test.status = 'validated'
        }
        return test;
      });

      state.value.audit.tests = [...testsList];
    }
  },
});

export const { loadAudit, validateTest } = auditSlice.actions;
export default auditSlice.reducer;