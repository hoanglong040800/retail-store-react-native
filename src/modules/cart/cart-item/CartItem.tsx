import { RADIUS, SPACE } from 'const';
import { useAppTheme } from 'hooks';
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
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Image source={{ uri: item.product.image }} style={styles.image} />

        <View style={styles.leftSectionContent}>
          <Text variant="titleSmall" numberOfLines={2}>
            {item.product.name}
          </Text>
          <Text variant="bodySmall" style={{ color: colors.onSurfaceVariant }}>
            {displayProductPrice(item.product)}
          </Text>
          <Text variant="titleSmall" style={styles.totalPriceText}>
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
    gap: SPACE.sm,
    paddingVertical: SPACE.sm,
  },

  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.sm,
  },

  leftSectionContent: {
    flex: 1,
  },

  image: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.sm,
  },

  totalPriceText: {
    marginTop: SPACE.xxs,
  },

  productActionButtons: {
    width: 128,
  },
});

export default CartItem;
