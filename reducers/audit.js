import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    website: null,
    results: null,
    tests: null
  },
};

export const auditSlice = createSlice({
  name: 'audit',
  initialState,
  reducers: {
    loadAudit: (state, action) => {
      state.value.website = action.payload.website;
      state.value.results = action.payload.results;
      state.value.tests = action.payload.tests;
    },
    validateTest: (state, action) => {
      // Mets à jour le tableau tests d'un audit (attention !! state.value = state audit qui contient une propriété audit => à ne pas)
      const testsList = state.value.tests.map(test => {
        if (test._id === action.payload) {
          test.status = 'validated'
        }
        return test;
      });

      state.value.tests = [...testsList];
    }
  },
});

export const { loadAudit, validateTest } = auditSlice.actions;
export default auditSlice.reducer;