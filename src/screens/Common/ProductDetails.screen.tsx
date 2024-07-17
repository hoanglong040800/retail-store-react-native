import { Route } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { BottomButtonWrapper, ScreenAppBar } from 'components';
import { CONTAINER_WRAP_BOT_BTN } from 'const';
import { ProductDetail } from 'modules/product/detail';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import { getProductById } from 'service';
import { ParamsType, ProductDto } from 'types';

type Params = Pick<ParamsType, 'productId'>;

type Props = {
  route: Route<'ProductDetails', Params>;
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
        <Button mode="contained" onPress={onPressAddToCart}>
          Add to cart
        </Button>
      </BottomButtonWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: CONTAINER_WRAP_BOT_BTN,
});

export default ProductDetailsScreen;
