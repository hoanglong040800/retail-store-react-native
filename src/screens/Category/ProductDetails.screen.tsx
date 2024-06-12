import { NavigationProp, Route } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { BottomButtonWrapper } from 'components';
import { CategoryBreadCrumb } from 'modules/category';
import { ProductDetail } from 'modules/product/detail';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import { getProductById } from 'service';
import { ParamsType, ProductDto } from 'types';

type Params = Pick<ParamsType, 'productId'>;

type Props = {
  route: Route<'ProductDetails', Params>;
  navigation: NavigationProp<{ ProductDetails: Params }>;
};

const ProductDetailsScreen = ({ navigation, route: { params } }: Props) => {
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
      <ScrollView>
        <Button onPress={() => navigation.goBack()}>Go back</Button>

        <CategoryBreadCrumb />

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
  container: {
    // container full -> allow bottom button stick at end
    flex: 1,

    // giving space to display bottom button
    paddingBottom: 64,
  },
});

export default ProductDetailsScreen;
