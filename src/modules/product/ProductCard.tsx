import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Card, Divider, Subheading, Text } from 'react-native-paper';
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
  return (
    <Card style={[style, styles.container]} onPress={onPress}>
      <Card.Cover source={{ uri: image }} style={styles.cover} resizeMode="contain" />

      <Card.Content>
        <Text variant="titleSmall" style={styles.title}>
          {name}
        </Text>

        <Divider />

        <Subheading style={styles.price}>{formatCurrency(price)}</Subheading>
      </Card.Content>

      {/* add touchable here to prevent action inside trigger press card */}
      <TouchableOpacity onPress={() => null} activeOpacity={1}>
        <Card.Actions style={styles.actionContainer}>
          <ProductActionButtons product={{ id, name }} />
        </Card.Actions>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {},

  cover: {
    height: 100,
    backgroundColor: 'white',
  },

  title: {
    paddingVertical: 4,
    height: 45,
  },

  price: {
    textAlign: 'right',
  },

  actionContainer: {
    marginTop: 12,
  },
});

export default ProductCard;
