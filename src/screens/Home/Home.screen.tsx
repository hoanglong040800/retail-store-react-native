import { BASE_STYLE } from 'const';
import { PromoProductSection } from 'modules/home';
import { useHomeScreen } from 'modules/home/hooks';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';

const HomeScreen = () => {
  // Hooks
  const { homeData, isLoadingHomeData } = useHomeScreen();

  if (!homeData && isLoadingHomeData) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView style={styles.container}>
      <PromoProductSection style={styles.pageLayout} productCarousels={homeData?.productCarousels} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...BASE_STYLE.SCROLL_VIEW_DEFAULT,
  },

  pageLayout: {
    // paddingHorizontal: 8,
  },
});

export default HomeScreen;
