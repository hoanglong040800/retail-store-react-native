/* eslint-disable react/jsx-props-no-spreading */
import { BottomButton } from 'components/button';
import { BASE_STYLE } from 'const';
import { ComponentProps, ReactNode } from 'react';
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type Props = {
  children?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  bottomButton?: ComponentProps<typeof BottomButton>;
};

const ModalLayout = ({ children, bottomButton, containerStyle }: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {children && <ScrollView style={styles.content}>{children}</ScrollView>}

      {bottomButton && <BottomButton {...bottomButton} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: BASE_STYLE.CONTAINER_WRAP_BOT_BTN,

  content: {
    flex: 1,
    padding: 16,
  },
});

export default ModalLayout;
