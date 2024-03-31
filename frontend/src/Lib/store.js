import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./Features/Cart/cartSlice";
import authSliceReducer from "./Features/Auth/authSlice";

export const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
    auth: authSliceReducer,
  },
});
