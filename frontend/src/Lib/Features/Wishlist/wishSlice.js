
import { createSlice } from "@reduxjs/toolkit"
const initialState = { wishlist:[] };
const wishSlice = createSlice({
    initialState,
    name:'wishlist',
    reducers:{
        addToWishlist:(state,action)=>{
            let add = true
            state.wishlist.map(e=>{
                if(e.id==action.payload.id){
                    add = false
                }
            })
            add && state.wishlist.push(action.payload)
        },
        removeAllWishlist:(state)=>{
            state.wishlist = []
        },
        removeFromWishlist:(state,action)=>{
            state.wishlist = state.wishlist.filter(e=>{
                if(e.id==action.payload.id){
                    return false
                }
                return true
            })
        }
    }
})

export const {addToWishlist,removeAllWishlist,removeFromWishlist} = wishSlice.actions
export default wishSlice.reducer