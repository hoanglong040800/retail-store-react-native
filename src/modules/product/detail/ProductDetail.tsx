import { Image, StyleSheet, View } from 'react-native';
import { Chip, Surface, Text } from 'react-native-paper';
import { useAppTheme } from 'hooks';
import { formatCurrency } from 'utils';

type Props = {
  name: string;
  description: string;
  price: number;
  image: string;
};

const ProductDetail = ({ name, description, price, image }: Props) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: image }}
        style={[styles.image, { backgroundColor: colors.elevation.level1 }]}
        resizeMode="contain"
      />

      <Surface elevation={1} style={[styles.surface, { backgroundColor: colors.elevation.level1 }]}>
        <View style={styles.content}>
          <View>
            <Text variant="titleMedium">{name}</Text>
            <Text variant="labelLarge">{formatCurrency(price)}</Text>
          </View>

          <View>
            <Chip icon="check">Available</Chip>
          </View>
        </View>

        <Chip mode="outlined" icon="phone" style={styles.outOfStockNote}>
          You will be informed when the product is not available
        </Chip>

        <View style={styles.descCtn}>
          <Text variant="titleSmall">Description</Text>
          <Text variant="bodyMedium">{description || 'Product currently have no description'}</Text>
        </View>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    width: '100%',
    height: 300,
    objectFit: 'contain',
  },

  surface: {
    padding: 8,
    borderRadius: 8,

    marginTop: 16,
  },

  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  outOfStockNote: {
    maxWidth: 600,
  },

  descCtn: {
    marginTop: 16,
  },
});

export default ProductDetail;
