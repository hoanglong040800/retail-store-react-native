import { Text } from 'react-native-paper';
import { SPACE } from 'const';
import { useResponsiveLayout } from 'hooks';
import { FlatList, StyleSheet, ViewStyle, StyleProp, View } from 'react-native';
import { ProductDto } from 'types/dto/product.dto';
import ProductCard from './ProductCard';

type Props = {
  colNum?: number;
  products: ProductDto[];
  onPressProductCard: (id: string) => void;
  style?: StyleProp<ViewStyle>;
};

const ProductList = ({ colNum, products, style, onPressProductCard }: Props) => {
  const { gridColumns, getGridItemWidth } = useResponsiveLayout();
  const columns = colNum ?? gridColumns;
  const itemWidth = getGridItemWidth(columns);

  // -- RENDER --
  const renderProductCard = ({ item }: { item: ProductDto }) => (
    <ProductCard
      id={item.id}
      name={item.name}
      image={item.image}
      price={item.price}
      onPress={() => onPressProductCard(item.id)}
      style={{ width: itemWidth }}
    />
  );

  if (!products || products.length === 0) {
    return (
      <View style={styles.empty}>
        <Text variant="titleMedium">No product found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      key={columns}
      numColumns={columns}
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
    gap: SPACE.sm,
    padding: SPACE.md,
  },

  columnWrapper: {
    gap: SPACE.sm,
  },

  empty: {
    alignItems: 'center',
    padding: SPACE.lg,
  },
});

export default ProductList;
