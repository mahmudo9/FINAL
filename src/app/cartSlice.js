import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../configs/api";

const initialState = {
  data: [],
  loading: false,
};

export const getCart = createAsyncThunk(`cart/getCart`, async () => {
  try {
    const res = await API.get("Cart/get-products-from-cart");
    return res.data;
  } catch (error) {
    console.log(error);
  }
});
export const addProduct = createAsyncThunk(`cart/addProduct`, async (id) => {
  try {
    await API.post(`Cart/add-product-to-cart?id=${id}`);
    const { data } = await API.get("product/getProduct");
    return data.data;
  } catch (error) {
    console.log(error);
  }
});

export const incrementToCart = createAsyncThunk(
  `cart/incrementToCart`,
  async (id) => {
    await API.put(`Cart/increase-product-in-cart?id=${id}`);
    return id;
  }
);

export const decrementToCart = createAsyncThunk(
  `cart/decrementToCart`,
  async (id) => {
    await API.put(`Cart/reduce-product-in-cart?id=${id}`);
    return id;
  }
);

export const deleteFromCart = createAsyncThunk(
  "cart/deleteFromCart",
  async (id) => {
    await API.delete(`Cart/delete-product-from-cart?id=${id}`);
    return id;
  }
);

export const Delete_All_from_Cart = createAsyncThunk(
  "cart/Delete_All_from_Cart",
  async () => {
    await API.delete(`Cart/clear-cart`);
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCart.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    });
  },
});

export default cartSlice.reducer;
