import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  loading: false,
};

export const getProduct = createAsyncThunk(`product/getProduct`, async () => {
  try {
    const res = await axios.get("http://37.27.29.18:8002/Product/get-products");
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProduct.fulfilled,(state,{ payload }) => {
    state.loading = false,
    state.data = payload
    })
  },
});


export default productSlice.reducer;
