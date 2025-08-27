import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("liked_items")) || [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleItem: (state, { payload }) => {
      const find = state.items.some((item) => item.id === payload.id);
      if (find) {
        state.items = state.items.filter((item) => item.id !== payload.id);
      } else {
        state.items = [...state.items, payload];
      }
      localStorage.setItem("liked_items", JSON.stringify(state.items));
    },
  },
});

export const { toggleItem } = wishlistSlice.actions;
export default wishlistSlice.reducer;
