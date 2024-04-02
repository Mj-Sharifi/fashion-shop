import { createSlice } from "@reduxjs/toolkit";

const initialState = { compareList: [] };
const compareSlice = createSlice({
  initialState,
  name: "compare",
  reducers: {
    addTocompare: (state, action) => {
      let add = true;
      state.compareList.map(e=>{
        if(e.attribures.id==action.payload.product.attribures.id){
            add = false
        }
      })
      add && state.compareList.push(action.payload.product)
    },
    remoceFromCompare: (state, action) => {
        state.compareList = state.compareList.filter(e=>{
            if(e.attribures.id==action.payload.product.attribures.id){
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
export const {addTocompare,remoceFromCompare,removeAllCopmare} = compareSlice.actions
export default compareSlice.reducer