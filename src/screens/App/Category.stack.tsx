import { createStackNavigator } from '@react-navigation/stack';
import { ProductDetailsScreen, ProductListScreen } from 'screens/Common';
import { HomeScreen } from 'screens/Home';
import { Screen } from 'types';

const CategoryStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Screen.Home} component={HomeScreen} />
      <Stack.Screen name={Screen.ProductList} component={ProductListScreen} />
      <Stack.Screen name={Screen.ProductDetail} component={ProductDetailsScreen} />
    </Stack.Navigator>
  );
};
export default CategoryStack;
