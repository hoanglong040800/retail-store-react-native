import { ViewStyle } from 'react-native';
import { MD3LightTheme, MD3Theme } from 'react-native-paper';

export const THEME: MD3Theme = {
  ...MD3LightTheme,
};

export const CUSTOM_THEME = {
  headerHeight: 60,
};

export const CONTAINER_WRAP_BOT_BTN: ViewStyle = {
  // container full -> allow bottom button stick at end
  flex: 1,
  // giving space to display bottom button
  paddingBottom: 48,
};
