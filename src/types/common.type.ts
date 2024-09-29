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

export type ParamsType = {
  mainCate?: CateParms;
  subCate?: CateParms;
  productId?: string;

  price?: number;
  active?: boolean;
};

export enum Screen {
  Home = 'Home',
  Category = 'Category',
  ProductList = 'ProductList',
  ProductDetail = 'ProductDetail',
  Cart = 'Cart',
  Noti = 'Noti',
  Account = 'Account',
  AllStores = 'AllStores',
}

export type EventDataType = ErrorResponse;
