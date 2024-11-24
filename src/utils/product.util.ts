import { ProductDto } from 'types';
import { formatCurrency, toTitleCase } from './common.util';

/**
 * @returns Example: 100 000đ / package
 */
export function displayProductPrice(product: ProductDto, locale = 'vi-VN'): string {
  if (!product) {
    throw new Error('Missing param: product');
  }

  const formattedPrice = formatCurrency(Number(product.price), locale);

  if (!formattedPrice) {
    throw new Error('Price is not valid');
  }

  if (product.unit) {
    return `${formattedPrice} / ${toTitleCase(product.unit)}`;
  }

  return formattedPrice;
}
