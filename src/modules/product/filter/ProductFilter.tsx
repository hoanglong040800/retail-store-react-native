import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

type Props = {
  onPressApply: () => void;
};

const ProductFilter = ({ onPressApply }: Props) => {
  return (
    <View aria-label="Product Filter" style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text>Product Filter</Text>
      </ScrollView>

      <View style={styles.btnCon}>
        <Button mode="outlined" onPress={() => console.log('Reset')} style={styles.btn}>
          Reset
        </Button>

        <Button mode="contained" onPress={onPressApply} style={styles.btn}>
          Apply
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

  scrollView: {
    flex: 1,
    marginBottom: 60, // Add margin to prevent content from being hidden behind button
  },

  btnCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },

  btn: {
    flex: 1,
  },
});

export default ProductFilter;
