// eslint-disable react/jsx-props-no-spreading
import { SIZE } from 'const';
import { useAppNavigation, useAppTheme } from 'hooks';
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
  const { colors } = useAppTheme();

  return (
    <Appbar.Header style={[styles.header, { backgroundColor: colors.elevation.level0 }]}>
      <Appbar.Action icon="chevron-left" onPress={onPressSecondary || goBack} />
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
    height: SIZE.appBarHeight,
  },
});

export default DeAppBar;
