import { createStackNavigator } from '@react-navigation/stack';
import { AppHeader } from 'components/header';
import { Screen } from 'types';
import { CartScreen, CheckoutFinishScreen, PaymentScreen } from 'screens/Cart';
import { AllBranchesScreen, ProductDetailsScreen, ProductListScreen } from 'screens/Common';
import { HomeScreen } from 'screens/Home';
import { DeAppBar } from 'components';
import { OrderDetailScreen, OrderHistoryScreen } from 'screens/Orders';

const AppNavigator = () => {
  const Stack = createStackNavigator();

  const renderAppHeader = () => <AppHeader />;
  const renderAppBar = (title: string) => <DeAppBar title={title} />;

  return (
    <Stack.Navigator screenOptions={{ header: renderAppHeader }}>
      <Stack.Screen name={Screen.Home} component={HomeScreen} />
      <Stack.Screen name={Screen.Cart} component={CartScreen} />
      <Stack.Screen
        name={Screen.Payment}
        component={PaymentScreen}
        options={{ header: () => renderAppBar('Payment') }}
      />

      <Stack.Screen
        name={Screen.CheckoutFinish}
        component={CheckoutFinishScreen}
        options={{ header: () => renderAppBar('Checkout Finish') }}
      />

      <Stack.Screen name={Screen.ProductList} component={ProductListScreen} />
      <Stack.Screen name={Screen.ProductDetail} component={ProductDetailsScreen} />
      <Stack.Screen name={Screen.AllBranches} component={AllBranchesScreen} />

      <Stack.Screen name={Screen.OrderHistory} component={OrderHistoryScreen} />
      <Stack.Screen name={Screen.OrderDetail} component={OrderDetailScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
