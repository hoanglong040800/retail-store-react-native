import { createStackNavigator } from '@react-navigation/stack';
import { AppHeader } from 'components/header';
import HomeStack from './Home.stack';

const AppNavigator = () => {
  const Stack = createStackNavigator();

  const renderAppHeader = () => <AppHeader />;

  return (
    <Stack.Navigator screenOptions={{ header: renderAppHeader }}>
      <Stack.Screen name="Main" component={HomeStack} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
