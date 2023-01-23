export type PizzaItemType = {
  id: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  imageUrl: string;
}

export enum StatusEnum {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface IPizzaState {
  items: PizzaItemType[];
  status: StatusEnum;
}

export type SearchPizzaParamsType = {
  order: string;
  category: string;
  sortBy: string;
}