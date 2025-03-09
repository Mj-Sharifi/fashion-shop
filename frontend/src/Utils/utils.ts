import { Single_Product } from "Types/api";
import { Wishlist_Item } from "Types/shop";

export const productPerPage = 9

export const isInWishlist = (id: number, wishlist: Wishlist_Item[]) => {
  let isIn = false;
  for (const w of wishlist) {
    if (id == w.id) {
      isIn = true;
      break;
    }
  }
  return isIn;
};

export const isInComparelist = (id: number, compareList: Single_Product[]) => {
  let isIn = false;
  for (const c of compareList) {
    if (id == c.id) {
      isIn = true;
      break;
    }
  }
  return isIn;
};
export const createProductSlug = (title: string) => { return title.toLowerCase().split(" ").join("-") }