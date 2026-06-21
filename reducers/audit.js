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
      // Récupère l'index concerné par la maj validated retourné par le back et envoyé dans le dispatch
      const index = state.value.tests.findIndex(test => test._id === action.payload._id);
      // Mets à jour le test concerné grace à l'index trouvé dans le tableau de tests 
      state.value.tests[index] = action.payload;
    },
    deleteAudit: (state, action) => {
      const deletedId = action.payload;
      if (state.value?.results?._id === deletedId) {
        state.value = initialState.value;
      }
    },
    deleteSite: (state, action) => {
      const deletedId = action.payload;
      if (state.value?.site?._id === deletedId) {
        state.value = initialState.value;
      }
    },
  }
});

export const { loadAudit, validateTest, deleteAudit, deleteSite } = auditSlice.actions;

export default auditSlice.reducer;