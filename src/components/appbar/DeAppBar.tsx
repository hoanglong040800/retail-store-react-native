import { CUSTOM_THEME, THEME } from 'const';
import { StyleSheet } from 'react-native';
import { Appbar, Button } from 'react-native-paper';

type Props = {
  title: string;
  primaryText: string;
  isHideRightBtn?: boolean;
  onPressSecondary: () => void;
  onPressPrimary: () => void;
};

const DeAppBar = ({ title, primaryText, isHideRightBtn, onPressSecondary, onPressPrimary }: Props) => {
  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Action icon="close" onPress={onPressSecondary} />
      <Appbar.Content title={title} />
      {!isHideRightBtn && <Button onPress={onPressPrimary}>{primaryText}</Button>}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: THEME.colors.primaryContainer,
    height: CUSTOM_THEME.headerHeight,
  },
});

export default DeAppBar;
