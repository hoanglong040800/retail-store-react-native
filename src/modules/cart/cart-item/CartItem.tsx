import { ProductActionButtons } from 'modules/product';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { CartItemDto } from 'types';
import { displayProductPrice, formatCurrency } from 'utils';

type Props = {
  item: CartItemDto;
};

const CartItem = ({ item }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Image source={{ uri: item.product.image }} style={styles.image} />

        <View>
          <Text variant="bodyMedium">{item.product.name}</Text>
          <Text variant="bodySmall">{displayProductPrice(item.product)}</Text>
          <Text variant="bodyLarge" style={styles.totalPriceText}>
            {formatCurrency(item.price)}
          </Text>
        </View>
      </View>

      <View>
        <ProductActionButtons
          productId={item.product.id}
          productName={item.product.name}
          offsetQuantity={1}
          containerStyle={styles.productActionButtons}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    padding: 4,
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },

  totalPriceText: {
    marginTop: 8,
  },

  productActionButtons: {
    maxWidth: 160,
  },
});

export default CartItem;
