import {createAsyncThunk} from "@reduxjs/toolkit";
import {PizzaItemType, SearchPizzaParamsType} from "./types";
import axios from "axios";

export const fetchPizzas = createAsyncThunk<PizzaItemType[], SearchPizzaParamsType>('pizzas/fetchPizzasStatus',
  async (params) => {
    const {order, category, sortBy} = params
    const res = await axios.get<PizzaItemType[]>(`https://6360c8a667d3b7a0a6b52a38.mockapi.io/Items?${category}&sortBy=${sortBy}&order=${order}`)
    return res.data
  }
)