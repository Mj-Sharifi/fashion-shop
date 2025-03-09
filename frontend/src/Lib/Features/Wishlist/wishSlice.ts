
import { createSlice } from "@reduxjs/toolkit"
import { Wishlist_Item } from "Types/shop";
const initialState:{wishlist:Wishlist_Item[]} = { wishlist:[] };
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
            console.log(action.payload);
            if(add) state.wishlist.push(action.payload)
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