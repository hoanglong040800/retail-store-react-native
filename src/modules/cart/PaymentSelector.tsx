import { DeModal } from 'components';
import { useModal } from 'hooks';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Text } from 'react-native-paper';

type PaymentOptionType = {
  icon: 'cash';
  text: string;
};

type Props = {
  onClick: () => void;
};

const PaymentSelector = ({ onClick }: Props) => {
  const paymentOptions: PaymentOptionType[] = [
    {
      icon: 'cash',
      text: 'Cash on delivery',
    },
  ];

  const { isOpen, onClose } = useModal();

  return (
    <>
      <Button onPress={onClick} labelStyle={styles.buttonLabel} contentStyle={styles.buttonContent}>
        <Text variant="labelLarge">Payment method:</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon source={paymentOptions[0].icon} size={20} />

          <Text>{paymentOptions[0].text}</Text>
        </View>
      </Button>

      <DeModal isOpen={isOpen} onClose={onClose}>
        <>
          {paymentOptions.map(({ icon, text }) => (
            <View style={styles.paymentLine} key={text}>
              <Icon source={icon} size={20} />

              <Text>{text}</Text>
            </View>
          ))}
        </>
      </DeModal>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContent: {
    flex: 1,
  },

  buttonLabel: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'black',
  },

  paymentLine: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export default PaymentSelector;
