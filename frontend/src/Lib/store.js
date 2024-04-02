import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./Features/Cart/cartSlice";
import authSliceReducer from "./Features/Auth/authSlice";
import wishSliceReducer from "./Features/Wishlist/wishSlice";

export const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
    auth: authSliceReducer,
    wishlist: wishSliceReducer
  },
});
