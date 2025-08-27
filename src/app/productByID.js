import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../configs/api";

const initialState = {
  dataById: null,
  loadingById: false,
};


export const getProductById = createAsyncThunk(`productById/getProductById`, async (id) => {
  try {
    const res = await API.get(`Product/get-product-by-id?id=${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const productByIdSlice = createSlice({
  name: "productById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductById.pending, (state) => {
      state.loadingById = true;
    });
    builder.addCase(getProductById.fulfilled,(state,{ payload }) => {
    state.loadingById = false;
    state.dataById = payload;
    })
  },
});


export default productByIdSlice.reducer;
