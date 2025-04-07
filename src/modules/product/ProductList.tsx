import { Text } from 'react-native-paper';
import { FlatList, StyleSheet, ViewStyle, StyleProp, View, Dimensions } from 'react-native';
import { ProductDto } from 'types/dto/product.dto';
import ProductCard from './ProductCard';
import { useProductListScreen } from './hooks';

type Props = {
  products: ProductDto[];
  style?: StyleProp<ViewStyle>;
};

const ProductList = ({ products, style }: Props) => {
  const { colNum, onPressProductCard } = useProductListScreen();

  // -- RENDER --
  const renderProductCard = ({ item }: { item: ProductDto }) => (
    <ProductCard
      id={item.id}
      name={item.name}
      image={item.image}
      price={item.price}
      onPress={() => onPressProductCard(item.id)}
      style={{ width: Dimensions.get('window').width / colNum - 16 }}
    />
  );

  if (!products || products.length === 0) {
    return (
      <View>
        <Text>No product found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      numColumns={colNum}
      renderItem={renderProductCard}
      keyExtractor={item => item.id}
      style={style}
      contentContainerStyle={styles.contentContainer}
      columnWrapperStyle={styles.columnWrapper}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    // make flatlist scrollable
    maxHeight: 0,
    gap: 16,
  },

  columnWrapper: {
    gap: 16,
  },
});

export default ProductList;
