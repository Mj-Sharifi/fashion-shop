import { createSlice } from "@reduxjs/toolkit";
import { Single_Product } from "Types/api";

const initialState:{list:(Single_Product&{quantity:number,color:string,size:string})[]} = { list: [] };
const cartSlise = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeAll: (state) => {
      state.list = [];
    },
    removeItem: (state, action) => {
      state.list = state.list.filter((e) => {
        if (
          e.id === action.payload.id &&
          e.size === action.payload.size &&
          e.color === action.payload.color
        ) {
          return false;
        }
        return e;
      });
    },
    addItem: (state, action) => {
      let add = true;
      state.list = state.list.map((e) => {
        if (
          e.id === action.payload.product.id &&
          e.size === action.payload.size &&
          e.color === action.payload.color
        ) {
          e.quantity += action.payload.quantity;
          add = false;
          return e;
        }
        return e;
      });
      add &&
        state.list.push({
          ...action.payload.product,
          quantity: action.payload.quantity,
          color: action.payload.color,
          size: action.payload.size,
        });
    },
    increaseQuantity: (state, action) => {
      state.list = state.list.map((e) => {
        if (
          e.id === action.payload.id &&
          e.size === action.payload.size &&
          e.color === action.payload.color
        ) {
          e.quantity += 1;
          return e;
        }
        return e;
      });
    },
    decreaseQuantity: (state, action) => {
      state.list = state.list.map((e) => {
        if (
          e.id === action.payload.id &&
          e.size === action.payload.size &&
          e.color === action.payload.color
        ) {
          e.quantity -= 1;
          return e;
        }
        return e;
      });
    },
  },
});
export const {
  removeAll,
  removeItem,
  addItem,
  increaseQuantity,
  decreaseQuantity,
} = cartSlise.actions;
export default cartSlise.reducer;
