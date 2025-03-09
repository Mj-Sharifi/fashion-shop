import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import sessionStorage from "redux-persist/es/storage/session";
import cartSliceReducer from "./Features/Cart/cartSlice";
import authSliceReducer from "./Features/Auth/authSlice";
import wishSliceReducer from "./Features/Wishlist/wishSlice";
import compareSliceReducer from "./Features/Compare/compareSlice";

const persistConfig = {
  key: "root",
  storage: sessionStorage,
};

// const rootReducer = combineReducers({
//   cart: cartSliceReducer,
//   wishlist: wishSliceReducer,
//   compare: compareSliceReducer,
// });
// const rootCartReducer = combineReducers({cartSliceReducer})
const persistedCartReducer = persistReducer(persistConfig, cartSliceReducer);
const persistedWishlistReducer = persistReducer(
  persistConfig,
  wishSliceReducer
);
const persistedCompareReducer = persistReducer(
  persistConfig,
  compareSliceReducer
);
const persistedAuthReducer = persistReducer(persistConfig, authSliceReducer);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    wishlist: persistedWishlistReducer,
    compare: persistedCompareReducer,
    auth: persistedAuthReducer,
  },
  middleware:(getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  })
});
export const persistor = persistStore(store);

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']