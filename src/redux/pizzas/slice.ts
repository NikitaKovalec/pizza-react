import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";

import {PizzaItemType, IPizzaState, SearchPizzaParamsType, StatusEnum} from "./types";
import {fetchPizzas} from "./asyncActions";

const initialState: IPizzaState = {
  items: [],
  status: StatusEnum.LOADING
}



const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItemType[]>) {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.items = []
      state.status = StatusEnum.LOADING
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = StatusEnum.SUCCESS
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.items = []
      state.status = StatusEnum.ERROR
    })
  }
  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.items = []
  //     state.status = 'loading'
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload
  //     state.status = 'success'
  //   },
  //   [fetchPizzas.rejected]: (state) => {
  //     state.items = []
  //     state.status = 'error'
  //   }
  // }
})

export const {setItems} = pizzasSlice.actions

export default pizzasSlice.reducer

