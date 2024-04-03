import { createStore } from "redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import sessionStorage from "redux-persist/es/storage/session";
import cartSliceReducer from "./Features/Cart/cartSlice";
import authSliceReducer from "./Features/Auth/authSlice";
import wishSliceReducer from "./Features/Wishlist/wishSlice";
import compareSliceReducer from "./Features/Compare/compareSlice";
import { thunk } from "redux-thunk";

const persistConfig = {
  key: "root",
  storage: sessionStorage,
};
const rootReducer = combineReducers({
  cart: cartSliceReducer,
  auth: authSliceReducer,
  wishlist: wishSliceReducer,
  compare: compareSliceReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: () => [thunk],
});
export const persistor = persistStore(store);
