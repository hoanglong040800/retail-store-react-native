import { CartItemDto } from 'types/dto';

export type InUseCart = {
  cartItems?: CartItemByProductId;
};

// productId as key
export type CartItemByProductId = Record<string, CartItemDto>;
