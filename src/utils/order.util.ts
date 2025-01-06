import { ORDER_ACTIONS_CONDITION } from 'const';
import { OrderActionEnum, OrderStatusEnum } from 'types/enum';

export const checkCanDoOrderAction = (orderAction: OrderActionEnum, orderStatus: OrderStatusEnum) => {
  const isStatusValid = ORDER_ACTIONS_CONDITION[orderAction].status.includes(orderStatus);

  return isStatusValid;
};
