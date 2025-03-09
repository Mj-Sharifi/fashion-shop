import { Image_Api } from "./api"

export type Shop_Layout = "card" | "list"
export type Wishlist_Item = {
    discount: number
    id: number
    imageprimary: { data: Image_Api }
    isAvailable: boolean
    price: number
    title: string
}