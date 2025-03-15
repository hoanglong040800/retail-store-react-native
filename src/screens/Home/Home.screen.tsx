import { useAppNavigation } from 'hooks';
import { PromoProductSection } from 'modules/home';
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

      <PromoProductSection style={styles.pageLayout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  pageLayout: {
    paddingHorizontal: 8,
  },
});

export default HomeScreen;
