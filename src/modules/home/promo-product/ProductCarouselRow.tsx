import { ScrollViewWrapper } from 'components';
import { BASE_STYLE } from 'const';
import { ProductCard } from 'modules/product';
import { StyleSheet, View } from 'react-native';
import { Button, Surface } from 'react-native-paper';

import { ProductByCateDto } from 'types/dto/home.dto';

type Props = {
  productCate: ProductByCateDto;
};

const ProductCarouselRow = ({ productCate }: Props) => {
  // TODO : use navigation
  const onClickCategory = (cateId: string) => {
    return cateId;
  };

  // Render
  if (!productCate) {
    return <View>No data</View>;
  }

  return (
    <Surface style={styles.container}>
      <Button
        mode="text"
        onPress={() => onClickCategory(productCate.category.id)}
        icon={{ uri: productCate.category.icon }}
        style={styles.headerContainer}
        labelStyle={styles.headerLabel}
      >
        {productCate.category.name}
      </Button>

      <ScrollViewWrapper itemSize="L" hideScrollbar>
        {productCate.products.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
            style={styles.productCard}
            onPress={() => {}}
          />
        ))}
      </ScrollViewWrapper>
    </Surface>
  );
};

const styles = StyleSheet.create({
  // not using flex: 1 -> having weird gap
  container: {
    ...BASE_STYLE.SURFACE_DEFAULT,
    paddingBottom: 20,
  },

  headerContainer: {
    marginBottom: 12,
  },

  headerLabel: {
    fontSize: 18,
  },

  productCard: {
    width: BASE_STYLE.PRODUCT_CARD.width,
    marginRight: 16,
  },
});

export default ProductCarouselRow;
