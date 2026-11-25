import { RADIUS, SIZE, SPACE } from 'const';
import { useAppTheme } from 'hooks';
import { Image, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { formatCurrency } from 'utils';
import ProductActionButtons from './ProductActionButtons';

type Props = {
  id: string;
  name: string;
  image: string;
  price: number;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
};

const ProductCard = ({ id, name, image, price, style, onPress }: Props) => {
  const { colors } = useAppTheme();

  return (
    <Card
      mode="elevated"
      elevation={1}
      style={[styles.container, { backgroundColor: colors.elevation.level1 }, style]}
      onPress={onPress}
    >
      <Image source={{ uri: image }} style={styles.cover} resizeMode="cover" />

      <View style={styles.body}>
        <Text variant="titleSmall" numberOfLines={2} style={styles.title}>
          {name}
        </Text>

        <Text variant="titleMedium" style={{ color: colors.primary }}>
          {formatCurrency(price)}
        </Text>

        {/* add touchable here to prevent action inside trigger press card */}
        <TouchableOpacity onPress={() => null} activeOpacity={1} style={styles.actionContainer}>
          <ProductActionButtons product={{ id, name }} />
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const TITLE_LINES = 2;
const TITLE_LINE_HEIGHT = 20;

const styles = StyleSheet.create({
  container: {
    width: SIZE.productCardWidth,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
  },

  cover: {
    width: '100%',
    aspectRatio: 1,
    borderTopLeftRadius: RADIUS.md,
    borderTopRightRadius: RADIUS.md,
  },

  body: {
    padding: SPACE.sm,
    gap: SPACE.xxs,
  },

  title: {
    height: TITLE_LINES * TITLE_LINE_HEIGHT,
  },

  actionContainer: {
    marginTop: SPACE.xs,
  },
});

export default ProductCard;
