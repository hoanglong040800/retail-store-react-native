import { loadStripe } from '@stripe/stripe-js';
import { ENV } from 'const';
import { useAppNavigation } from 'hooks';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Screen } from 'types';

const HomeScreen = () => {
  const { navigate } = useAppNavigation();

  const onPressViewAllBranches = () => {
    navigate(Screen.AllBranches);
  };

  return (
    <View style={styles.container}>
      <Button onPress={onPressViewAllBranches}>View all stores</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
