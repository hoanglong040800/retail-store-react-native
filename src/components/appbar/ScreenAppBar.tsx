import { useAppNavigation } from 'hooks';
import { Appbar, Text } from 'react-native-paper';

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
      <Appbar.Action icon="chevron-left" size={20} onPress={onPressBack} />

      <Text variant="titleMedium">{title}</Text>
    </Appbar.Header>
  );
};

export default ScreenAppBar;
