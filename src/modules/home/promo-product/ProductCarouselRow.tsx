import { ScrollViewWrapper } from 'components';
import { BASE_STYLE } from 'const';
import { useAppNavigation } from 'hooks';
import { ProductCard } from 'modules/product';
import { StyleSheet, View } from 'react-native';
import { Button, Surface } from 'react-native-paper';
import { ParamsType, Screen } from 'types';

import { ProductByCateDto } from 'types/dto/home.dto';

type Props = {
  productCate: ProductByCateDto;
};

const ProductCarouselRow = ({ productCate }: Props) => {
  const { navigate } = useAppNavigation();

  const onClickCategory = () => {
    const params: ParamsType = {
      mainCate: {
        id: productCate.category?.parentCategory.id,
        name: productCate.category?.parentCategory.name,
      },

      subCate: {
        id: productCate.category.id,
        name: productCate.category.name,
      },
    };

    navigate(Screen.ProductList, params);
  };

  // Render
  if (!productCate) {
    return <View>No data</View>;
  }

  return (
    <Surface style={styles.container}>
      <Button
        mode="text"
        onPress={() => onClickCategory()}
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
