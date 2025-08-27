import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  loading: false,
  selectedCategory: "All products",
  selectedCategoryId: null,
};

export const getCategory = createAsyncThunk(
  `category/getCategory`,
  async () => {
    try {
      const res = await axios.get(
        "http://37.27.29.18:8002/Category/get-categories"
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setSelectedCategoryId(state, action) {
      state.selectedCategoryId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCategory.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    });
  },
});

export default categorySlice.reducer;
