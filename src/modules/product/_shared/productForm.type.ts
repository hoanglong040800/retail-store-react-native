export type SortProductVaule = 'price' | 'name' | '';

export type SortBy = 'asc' | 'desc';

export type ProductFilterForm = {
  sortValue?: SortProductVaule;
  sortBy?: SortBy;

  priceRange?: number[];
};
