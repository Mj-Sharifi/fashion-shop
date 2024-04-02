import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./Features/Cart/cartSlice";
import authSliceReducer from "./Features/Auth/authSlice";
import wishSliceReducer from "./Features/Wishlist/wishSlice";
import compareSliceReducer from "./Features/Compare/compareSlice";
export const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
    auth: authSliceReducer,
    wishlist: wishSliceReducer,
    compare: compareSliceReducer,
  },
});
