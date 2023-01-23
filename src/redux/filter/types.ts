export enum SortPropertyEnum {
  RATING = 'rating',
  TITLE = 'title',
  PRICE = 'price',
}

export type SortType = {
  name: string;
  sortProp: SortPropertyEnum;
}

export interface IFilterState {
  searchValue: string;
  categoryId: number;
  sortItem: SortType;
}