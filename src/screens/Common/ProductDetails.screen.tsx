import { Route } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { BottomButtonWrapper, ScreenAppBar } from 'components';
import { BASE_STYLE } from 'const';
import { ProductActionButtons } from 'modules';
import { ProductDetail } from 'modules/product/detail';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { getProductById } from 'service';
import { ParamsType, ProductDto, Screen } from 'types';

type Params = Pick<ParamsType, 'productId'>;

type Props = {
  route: Route<Screen.ProductDetail, Params>;
};

const ProductDetailsScreen = ({ route: { params } }: Props) => {
  const { data: product, isLoading } = useQuery<ProductDto, null, ProductDto>({
    queryKey: ['product'],
    queryFn: () => getProductById(params.productId),
  });

  const onPressAddToCart = () => {
    // TOOD
  };

  if (isLoading || !product) {
    return <ActivityIndicator animating />;
  }

  return (
    <View style={styles.container}>
      <ScreenAppBar title={product.name} />

      <ScrollView>
        <ProductDetail
          name={product.name}
          description={product.description}
          price={product.price}
          image={product.image}
        />
      </ScrollView>

      <BottomButtonWrapper>
        <ProductActionButtons productId={product.id} productName={product.name} />
      </BottomButtonWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: BASE_STYLE.CONTAINER_WRAP_BOT_BTN,
});

export default ProductDetailsScreen;
