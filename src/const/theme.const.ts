import { ViewStyle } from 'react-native';
import { DefaultTheme, MD3Theme } from 'react-native-paper';

export const THEME: MD3Theme = {
  ...DefaultTheme,

  colors: {
    ...DefaultTheme.colors,
    primary: '#4caf50', // green
    primaryContainer: '#6ecf79',
    inversePrimary: '#fca063', // orange

    secondary: '#ffee59', // yellow
    secondaryContainer: '#fff9b9',

    tertiary: '#a6cf55', // oliver green
    tertiaryContainer: '#b5c398',

    onPrimary: '#ffffff',
    onPrimaryContainer: '#ffffff',
    onSecondary: '#000000',
    onSecondaryContainer: '#000000',

    elevation: {
      level0: '#edf7ed',
      level1: '#fff',
      level2: '#f4f4f4',
      level3: '#ececec',
      level4: '#e3e3e3',
      level5: '#dddddd',
    },

    surfaceVariant: '#93cf96', // same as elevation lv3
    inverseOnSurface: '#ffc59f', // based on inverse primary
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

export const SURFACE_THEME: Record<'default', ViewStyle> = {
  default: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'white',
  },
};
