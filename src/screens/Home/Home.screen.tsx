import { useAppNavigation } from 'hooks';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Screen } from 'types';

const HomeScreen = () => {
  const { navigate } = useAppNavigation();

  const onPressViewAllStores = () => {
    navigate(Screen.AllStores);
  };

  return (
    <View style={styles.container}>
      <Button onPress={onPressViewAllStores}>View all stores</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
