import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {getCartFromLS} from "../../utils/getCartFromLS";
import {calcTotalPrice} from "../../utils/calcTotalPrice";
import {CartItemType, ICartSliceState} from "./types";

const {items, totalPrice} = getCartFromLS()

const initialState: ICartSliceState = {
  totalPrice,
  items
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItems(state, action: PayloadAction<CartItemType>) {
      const  findItems = state.items.find(obj => obj.id === action.payload.id)

      if (findItems) {
        findItems.count++
      } else {
        state.items.push({...action.payload, count: 1})
      }

      state.totalPrice = calcTotalPrice(state.items)
    },
    minusItem(state, action: PayloadAction<string>) {
      const  findItems = state.items.find(obj => obj.id === action.payload)

      if(findItems) {
        findItems.count--
      }
      state.totalPrice = calcTotalPrice(state.items)
    },
    removeItems(state, action: PayloadAction<string>) {
      state.items = state.items.filter(obj => obj.id !== action.payload)
      state.totalPrice = calcTotalPrice(state.items)
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = 0
    },
  }
})



export const { addItems, removeItems, clearItems, minusItem } = cartSlice.actions

export default cartSlice.reducer