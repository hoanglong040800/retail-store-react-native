import { useAppNavigation } from 'hooks';
import { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, Button, Text } from 'react-native-paper';

type Props = {
  title: string;
  right?: ReactNode;
};

const ScreenAppBar = ({ title, right }: Props) => {
  const { goBack } = useAppNavigation();

  const onPressBack = () => {
    goBack();
  };

  return (
    <Appbar.Header style={styles.header}>
      <Button icon="chevron-left" textColor="black" onPress={onPressBack}>
        <Text variant="titleMedium">{title}</Text>
      </Button>

      {right}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default ScreenAppBar;
