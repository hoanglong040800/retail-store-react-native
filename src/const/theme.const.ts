import { Dimensions, ViewStyle } from 'react-native';
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
      level0: '#fff',
      level1: '#f9f9f9',
      level2: '#f4f4f4',
      level3: '#ececec',
      level4: '#e3e3e3',
      level5: '#dddddd',
    },

    surfaceVariant: '#fff', // input background
    inverseOnSurface: '#ffc59f', // based on inverse primary
  },
};

export const CUSTOM_THEME = {
  headerHeight: 60,
};

const SCROLL_VIEW_DEFAULT: ViewStyle = {
  flex: 1,
  maxHeight: Dimensions.get('window').height - CUSTOM_THEME.headerHeight - 16,
};

type BASE_STYLE_KEY = 'CONTAINER_WRAP_BOT_BTN' | 'SCROLL_VIEW_DEFAULT' | 'SCROLL_VIEW_BOT_BTN' | 'SURFACE_DEFAULT';
type BASE_STYPE_TYPE = Record<BASE_STYLE_KEY, ViewStyle>;

export const BASE_STYLE: BASE_STYPE_TYPE = {
  CONTAINER_WRAP_BOT_BTN: {
    // container full -> allow bottom button stick at end
    flex: 1,
    // giving space to display bottom button
    paddingBottom: 48,
  },

  SCROLL_VIEW_DEFAULT,

  SCROLL_VIEW_BOT_BTN: {
    ...SCROLL_VIEW_DEFAULT,
    padding: 16,
    // def pad-bot: 16, bot btn pat bot 48
    maxHeight: Dimensions.get('window').height - CUSTOM_THEME.headerHeight - 16 - 48,
  },

  SURFACE_DEFAULT: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'white',
  },
};
