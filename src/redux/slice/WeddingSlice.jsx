import { createSlice } from "@reduxjs/toolkit";

const weddingSlice = createSlice({
  name: "wedding",
  initialState: {
    details: null
  },
  reducers: {
    addWedding: (state, action) => {
      state.details = action.payload;
    },
    updateWedding: (state, action) => {
      state.details = action.payload;
    },
    deleteWedding: (state) => {
      state.details = null;
    }
  }
});

export const { addWedding, updateWedding ,deleteWedding } = weddingSlice.actions;
export default weddingSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const weddingSlice = createSlice({
//   name: "wedding",
//   initialState: {
//   functions: {}
// }
// ,
//   reducers: {
//     addWedding: (state, action) => {
//   const { functionType, data } = action.payload;
//   state.functions[functionType] = data;
// },

// updateWedding: (state, action) => {
//   const { functionType, data } = action.payload;
//   state.functions[functionType] = data;
// },

// deleteWedding: (state, action) => {
//   const functionType = action.payload;
//   delete state.functions[functionType];
// }
//   }
// });

// export const { addWedding, updateWedding ,deleteWedding } = weddingSlice.actions;
// export default weddingSlice.reducer;