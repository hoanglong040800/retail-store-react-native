import { useAppNavigation } from 'hooks';
import { Appbar, Button, Text } from 'react-native-paper';

type Props = {
  title: string;
};

const ScreenAppBar = ({ title }: Props) => {
  const { goBack } = useAppNavigation();

  const onPressBack = () => {
    goBack();
  };

  return (
    <Appbar.Header style={{ backgroundColor: 'transparent', height: 40 }}>
      <Button icon="chevron-left" textColor="black" onPress={onPressBack}>
        <Text variant="titleMedium">{title}</Text>
      </Button>
    </Appbar.Header>
  );
};

export default ScreenAppBar;
