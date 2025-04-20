import { PaymentOptionType, PaymentType } from 'types';
import { OrderActionEnum, OrderStatusEnum, PaymentMethodEnum } from 'types/enum';
import { keyBy } from 'utils';

export const PAYMENT_OPTIONS: PaymentOptionType[] = [
  {
    method: PaymentMethodEnum.cash,
    icon: 'cash',
    text: 'Cash on delivery',
  },
  {
    method: PaymentMethodEnum.creditCard,
    icon: 'credit-card',
    text: 'Credit Card',
  },
];

export const PROPS_BY_PAYMENT_METHOD: Record<PaymentMethodEnum, PaymentOptionType> = keyBy(PAYMENT_OPTIONS, 'method');

export const PAYMENT_METHOD_BY_TYPE: Record<PaymentType, PaymentMethodEnum[]> = {
  [PaymentType.online]: [PaymentMethodEnum.creditCard],
  [PaymentType.offline]: [PaymentMethodEnum.cash],
};

export const ORDER_ACTIONS_CONDITION: Record<OrderActionEnum, { status: OrderStatusEnum[] }> = {
  [OrderActionEnum.editCart]: {
    status: [OrderStatusEnum.pending],
  },

  [OrderActionEnum.cancel]: {
    status: [OrderStatusEnum.pending, OrderStatusEnum.awaitingPayment, OrderStatusEnum.awaitingFulfillment],
  },
};

export const SEARCH_BAR = {
  MAXIMUM_RECENT_SEARCH_TEXT: 5,
};

type DefaultInputType = {
  priceRange: [number, number];
  priceStep: number;
};

export const DEFAULT_INPUT_VALUE: DefaultInputType = {
  priceRange: [0, 100000],
  priceStep: 20000,
};
