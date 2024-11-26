// eslint-disable react/jsx-props-no-spreading
import { CUSTOM_THEME, THEME } from 'const';
import { useAppNavigation } from 'hooks';
import { StyleSheet } from 'react-native';
import { Appbar, Button, ButtonProps } from 'react-native-paper';

type Props = {
  title: string;
  primaryText?: string;
  isHideRightBtn?: boolean;
  rightButtonProps?: Omit<ButtonProps, 'children'>;
  onPressSecondary?: () => void;
  onPressPrimary?: () => void;
};

const DeAppBar = ({
  title,
  primaryText,
  isHideRightBtn,
  rightButtonProps,
  onPressSecondary,
  onPressPrimary,
}: Props) => {
  const { goBack } = useAppNavigation();

  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Action icon="chevron-left" onPress={onPressSecondary || goBack} style={styles.leftIcon} />
      <Appbar.Content title={title} />
      {(!isHideRightBtn || !primaryText) && (
        <Button onPress={onPressPrimary} {...rightButtonProps}>
          {primaryText}
        </Button>
      )}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: THEME.colors.primaryContainer,
    height: CUSTOM_THEME.headerHeight,
  },

  leftIcon: {
    backgroundColor: THEME.colors.primaryContainer,
  },
});

export default DeAppBar;
