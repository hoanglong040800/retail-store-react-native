import { StyleProp, ViewStyle } from 'react-native';

export const getHiddenDisplayStyle = (
  isHidden: boolean,
  originalStyle?: StyleProp<ViewStyle>
): StyleProp<ViewStyle> => {
  return isHidden ? { display: 'none' } : originalStyle;
};
