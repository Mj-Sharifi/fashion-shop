import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./Features/Cart/cartSlice";

// export const makeStore = () => {
//   return configureStore({
//     reducer: { cart: cartSliceReducer },
//   });
// };
export const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
  },
});
