import { ViewStyle } from 'react-native';
import { DefaultTheme, MD3Theme } from 'react-native-paper';

export const THEME: MD3Theme = {
  ...DefaultTheme,

  colors: {
    ...DefaultTheme.colors,
    primary: '#4caf50', // green
    primaryContainer: '#35b644',

    secondary: '#ffee59', // yellow
    secondaryContainer: '#fffde7',

    tertiary: '#f5f5f5', // gray
    tertiaryContainer: '#f5f5f5',

    onPrimary: '#ffffff',
    onPrimaryContainer: '#ffffff',
    onSecondary: '#000000',
    onSecondaryContainer: '#000000',
  },
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
