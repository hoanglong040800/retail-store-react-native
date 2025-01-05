import { OrderDto } from './order.dto';
import { IBase } from '../interface';

export type UserOrderDto = Pick<Required<OrderDto>, 'id' | 'deliveryType' | 'cart' | 'status'> &
  Pick<IBase, 'createdAt'>;

export type GetUserOrdersDto = {
  orders: UserOrderDto[];
};

export class GetUserOrderDetailDto {
  order: Pick<OrderDto, 'id' | 'deliveryType' | 'cart' | 'status'>;
}
