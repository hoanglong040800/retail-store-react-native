import { CardCvcElement, CardExpiryElement, CardNumberElement } from '@stripe/react-stripe-js';
import { StripeElementStyle } from '@stripe/stripe-js';
import { useMemo } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

const { width } = Dimensions.get('window');
const cardSectionWidth = width - 32;
const cardSelectionPadding = 16;
const elementGap = 16;

const StripeCardElement = () => {
  return (
    <View style={styles.cardSection}>
      <ElementRow label="Card Number" widthRatio={1}>
        <CardNumberElement options={{ placeholder: '4242 4242 4242 4242', style: elementStyles, showIcon: true }} />
      </ElementRow>

      <ElementRow label="Expiration date" widthRatio={0.5}>
        <CardExpiryElement options={{ placeholder: 'MM/YY', style: elementStyles }} />
      </ElementRow>

      <ElementRow label="CVC" widthRatio={0.5}>
        <CardCvcElement options={{ placeholder: '111', style: elementStyles }} />
      </ElementRow>
    </View>
  );
};

const ElementRow = ({ label, children, widthRatio = 1 }) => {
  const containerWith = useMemo(() => {
    return cardSectionWidth * widthRatio - elementGap - cardSelectionPadding;
  }, [widthRatio]);

  return (
    <View style={{ width: containerWith }}>
      <Text variant="bodyLarge" style={{ marginBottom: 8 }}>
        {label}
      </Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  cardSection: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: elementGap,
    padding: cardSelectionPadding,
  },
});

const elementStyles: StripeElementStyle = {
  base: {
    fontSize: '1.1em',
    fontSmoothing: 'antialiased',
    lineHeight: '1.2em',
  },
};

export default StripeCardElement;
