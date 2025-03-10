import { ProductActionButtons } from 'modules/product';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { CartItemDto } from 'types';
import { displayProductPrice, formatCurrency } from 'utils';

type Props = {
  item: CartItemDto;
  viewOnly?: boolean;
};

const CartItem = ({ item, viewOnly }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Image source={{ uri: item.product.image }} style={styles.image} />

        <View style={styles.leftSectionContent}>
          <Text variant="bodyMedium">{item.product.name}</Text>
          <Text variant="bodySmall">{displayProductPrice(item.product)}</Text>
          <Text variant="bodyLarge" style={styles.totalPriceText}>
            {formatCurrency(item.totalPrice)}
          </Text>
        </View>
      </View>

      <View>
        {viewOnly ? (
          <Text variant="titleLarge">x{item.quantity}</Text>
        ) : (
          <ProductActionButtons product={item.product} containerStyle={styles.productActionButtons} />
        )}
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  leftSectionContent: {
    flex: 1,
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
