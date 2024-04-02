import { createSlice } from "@reduxjs/toolkit";

const initialState = { compareList: [] };
const compareSlice = createSlice({
  initialState,
  name: "compare",
  reducers: {
    addToCompare: (state, action) => {
      let add = true;
      state.compareList.map(e=>{
        if(e.id==action.payload.product.id){
            add = false
        }
      })
      add && state.compareList.push(action.payload.product)
    },
    removeFromCompare: (state, action) => {
        state.compareList = state.compareList.filter(e=>{
            if(e.id==action.payload.product.id){
                return false
            }
            return e
        })
    },
    removeAllCopmare:(state)=>{
        state.compareList = []
    }
  },
});
export const {addToCompare,removeFromCompare,removeAllCopmare} = compareSlice.actions
export default compareSlice.reducer