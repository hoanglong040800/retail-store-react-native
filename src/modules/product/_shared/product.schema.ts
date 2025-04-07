/* eslint-disable  @typescript-eslint/no-explicit-any */
import * as yup from 'yup';
import { ProductFilterForm } from './productForm.type';

export const productFilterSchema: Record<keyof ProductFilterForm, yup.Schema<any>> = {
  sortValue: yup.string().optional(),
  sortBy: yup.string().optional(),

  priceStart: yup.number().optional(),
  priceEnd: yup.number().optional(),
};
