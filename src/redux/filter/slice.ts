import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {IFilterState, SortType, SortPropertyEnum} from "./types";

const initialState: IFilterState = {
  searchValue: '',
  categoryId: 0,
  sortItem: {
    name: 'популярные',
    sortProp: SortPropertyEnum.RATING
  },
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload
    },
    setSortItem(state, action: PayloadAction<SortType>) {
      state.sortItem = action.payload
    },
    setFilters(state, action: PayloadAction<IFilterState>) {
      state.sortItem = action.payload.sortItem
      state.categoryId = Number(action.payload.categoryId)
    }
  }
})

export const { setCategoryId, setSortItem, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer