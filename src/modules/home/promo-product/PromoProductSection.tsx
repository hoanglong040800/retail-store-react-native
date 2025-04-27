import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { ProductByCateDto } from 'types/dto/home.dto';
import ProductCarouselRow from './ProductCarouselRow';

type Props = {
  productCarousels: ProductByCateDto[];
  style?: StyleProp<ViewStyle>;
};

const PromoProductSection = ({ productCarousels, style }: Props) => {
  if (!productCarousels) {
    return <View>No data</View>;
  }

  return (
    <View style={[styles.container, style]}>
      {productCarousels.map(productCate => (
        <ProductCarouselRow key={productCate.category.id} productCate={productCate} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
});

export default PromoProductSection;
