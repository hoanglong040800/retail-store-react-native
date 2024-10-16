import { NumericInput } from 'components';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Card, Divider, Subheading, Text } from 'react-native-paper';
import { formatCurrency } from 'utils';

type Props = {
  id: string;
  name: string;
  image: string;
  price: number;
  inCartQuantity: number;
  onPress: () => void;
  onAdjustQuantity: (productId: string, quantity: number) => Promise<void>;
};

const ProductCard = ({ id, name, image, price, inCartQuantity = 0, onPress, onAdjustQuantity }: Props) => {
  const offsetQuantity = 1;

  const handlePressAddCart = () => {
    onAdjustQuantity(id, offsetQuantity);
  };

  const handleAdjustQuantity = (newVal: number) => {
    onAdjustQuantity(id, newVal);
  };

  return (
    <Card style={styles.container} onPress={onPress}>
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
          {inCartQuantity === 0 ? (
            <Button style={styles.addToCart} onPress={handlePressAddCart}>
              Add to cart
            </Button>
          ) : (
            <NumericInput value={inCartQuantity} offset={offsetQuantity} onChange={handleAdjustQuantity} />
          )}
        </Card.Actions>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '30%',
  },

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

  addToCart: {
    flex: 1,
    height: '100%',
  },
});

export default ProductCard;
