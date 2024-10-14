import { NumericInput } from 'components';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Divider, Subheading, Text } from 'react-native-paper';
import { formatCurrency } from 'utils';

type Props = {
  name: string;
  image: string;
  price: number;
  onPress: () => void;
};

const ProductCard = ({ name, image, price, onPress = () => null }: Props) => {
  const [state, setState] = useState(0);

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
          {/* <Button onPress={onPressAddToCart}>Add to cart</Button> */}
          <NumericInput value={state} onChange={setState} />
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
});

export default ProductCard;
