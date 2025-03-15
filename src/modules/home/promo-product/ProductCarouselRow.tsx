import { ScrollViewWrapper } from 'components';
import { BASE_STYLE } from 'const';
import { ProductCard } from 'modules/product';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { ProductByCateDto } from 'types/dto/home.dto';

type Props = {
  productCate: ProductByCateDto;
};

const ProductCarouselRow = ({ productCate }: Props) => {
  // Render

  if (!productCate) {
    return <View>No data</View>;
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall">{productCate.category.name}</Text>

      <ScrollViewWrapper itemSize="L">
        {productCate.products.map(product => (
          <ProductCard
            id={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
            style={styles.productCard}
            onPress={() => {}}
          />
        ))}
      </ScrollViewWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  // not using flex: 1 -> having weird gap
  container: {},

  productCard: {
    width: BASE_STYLE.PRODUCT_CARD.width,
    marginRight: 16,
  },
});

export default ProductCarouselRow;
