import { createStackNavigator } from '@react-navigation/stack';
import { AppHeader } from 'components/header';
import { Screen } from 'types';
import { CartScreen, CheckoutFinishScreen } from 'screens/Cart';
import { AllBranchesScreen, ProductDetailsScreen, ProductListScreen } from 'screens/Common';
import { HomeScreen } from 'screens/Home';

const AppNavigator = () => {
  const Stack = createStackNavigator();

  const renderAppHeader = () => <AppHeader />;

  return (
    <Stack.Navigator screenOptions={{ header: renderAppHeader }}>
      <Stack.Screen name={Screen.Cart} component={CartScreen} />
      <Stack.Screen name={Screen.CheckoutFinish} component={CheckoutFinishScreen} />
      <Stack.Screen name={Screen.Home} component={HomeScreen} />
      <Stack.Screen name={Screen.ProductList} component={ProductListScreen} />
      <Stack.Screen name={Screen.ProductDetail} component={ProductDetailsScreen} />
      <Stack.Screen name={Screen.AllBranches} component={AllBranchesScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
