import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlise";
// import categorySlice from "./categorySlice"; 
import wishlistReducer from "./wishlistSlice";
import productByIdReducer from "./productByID";
import  cartSlice  from "./cartSlice";
import categoryReducer from './categorySlice';
export const store = configureStore({
  reducer: {
    product: productSlice,
    category: categoryReducer,
    wishlist: wishlistReducer,
    productByIdReducer: productByIdReducer,
    cart:cartSlice,
  },
});
