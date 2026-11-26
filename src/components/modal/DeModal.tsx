import { DeAppBar } from 'components/appbar';
import { RADIUS, SIZE } from 'const';
import { useAppTheme, useResponsiveLayout } from 'hooks';
import { Modal, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type Props = {
  isOpen: boolean;
  title?: string;
  children: JSX.Element;
  hideHeader?: boolean;
  isHideHeaderButton?: boolean;
  contentStyles?: StyleProp<ViewStyle>;

  onConfirm?: () => void;
  onClose: () => void;
};

const DIALOG_MAX_HEIGHT = 640;

const DeModal = ({
  isOpen,
  title,
  children,
  hideHeader,
  isHideHeaderButton,
  contentStyles,
  onConfirm,
  onClose,
}: Props) => {
  const { colors } = useAppTheme();
  const { isPhone } = useResponsiveLayout();

  const body = (
    <>
      {!hideHeader && (
        <DeAppBar
          title={title}
          isHideRightBtn={isHideHeaderButton}
          primaryText="Save"
          onPressPrimary={onConfirm}
          onPressSecondary={onClose}
        />
      )}

      <View style={[styles.content, contentStyles]}>{children}</View>
    </>
  );

  return (
    <Modal
      visible={isOpen}
      onDismiss={onClose}
      onRequestClose={onClose}
      presentationStyle="overFullScreen"
      animationType={isPhone ? 'slide' : 'fade'}
      transparent={!isPhone}
    >
      {isPhone ? (
        <View style={[styles.content, { backgroundColor: colors.background }]}>{body}</View>
      ) : (
        <View style={[styles.backdrop, { backgroundColor: colors.backdrop }]}>
          <View style={[styles.dialog, { backgroundColor: colors.background, shadowColor: colors.shadow }]}>
            {body}
          </View>
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },

  backdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  dialog: {
    width: '100%',
    maxWidth: SIZE.dialogMaxWidth,
    height: DIALOG_MAX_HEIGHT,
    maxHeight: '90%',
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 5,
  },
});

export default DeModal;
