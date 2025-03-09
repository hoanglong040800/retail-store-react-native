import { BranchDto } from './dto';
import { DeliveryTypeEnum, PaymentMethodEnum } from './enum';

export type ErrorResponse = {
  errorCode: string;
  status: number;
  message: string;
};

export type SnackbarType = 'success' | 'error';

export type TSnackbar = {
  visible?: boolean;
  title: string;
  type: SnackbarType;
};

export type TabScreenProps = {
  name: string;
  component: () => JSX.Element;
  options: {
    tabBarLabel: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    iconName: any;
  };
};

type CateParms = {
  id: string;
  name: string;
};

type CheckoutFinishParams = {
  deliveryType: DeliveryTypeEnum;
  address?: string;
  selectedBranch: BranchDto;
  paymentMethod: PaymentMethodEnum;
};

export type ParamsType = {
  mainCate?: CateParms;
  subCate?: CateParms;
  productId?: string;

  price?: number;
  active?: boolean;
  checkoutFinish?: CheckoutFinishParams;

  orderId?: string;
};

export enum Screen {
  Home = 'Home',
  Category = 'Category',
  ProductList = 'Product List',
  ProductDetail = 'Product Detail',
  Cart = 'Cart',
  Noti = 'Noti',
  Account = 'Account',
  AllBranches = 'All Branches',
  CheckoutFinish = 'CheckoutFinish',
  Payment = 'Payment',
  OrderHistory = 'OrderHistory',
  OrderDetail = 'OrderDetail',
}

export type EventDataType = ErrorResponse;
