import { DeAppBar } from 'components/appbar';
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
  return (
    <Modal visible={isOpen} onDismiss={onClose} presentationStyle="overFullScreen" animationType="slide">
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
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});

export default DeModal;
