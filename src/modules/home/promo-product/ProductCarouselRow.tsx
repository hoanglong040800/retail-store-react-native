import { ScrollViewWrapper } from 'components';
import { SIZE, SPACE } from 'const';
import { useAppNavigation } from 'hooks';
import { ProductCard } from 'modules/product';
import { Image, StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
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
    <View style={styles.container}>
      <View style={styles.titleCon}>
        <View style={styles.titleLeft}>
          <Image source={{ uri: productCate.category.icon }} style={styles.titleLeftImage} />

          <Text variant="titleLarge">{productCate.category.name}</Text>
        </View>

        <IconButton mode="contained-tonal" icon="chevron-right" size={18} onPress={() => onClickCategory()} />
      </View>

      <ScrollViewWrapper itemSize="L" hideScrollbar>
        {productCate.products.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
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

  titleCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACE.md,
  },

  titleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.xs,
  },

  titleLeftImage: {
    width: SIZE.iconMd,
    height: SIZE.iconMd,
  },
});

export default ProductCarouselRow;
