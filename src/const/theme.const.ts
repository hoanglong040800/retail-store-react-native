import { Dimensions, ViewStyle } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, MD3Theme, configureFonts } from 'react-native-paper';
import { BOTTOM_BAR_HEIGHT, RADIUS, SIZE, SPACE } from './layout.const';

// Values from design-system/tokens.json. Keep in sync.

type AppExtraColors = {
  success: string;
  onSuccess: string;
  successContainer: string;
  onSuccessContainer: string;
  warning: string;
  onWarning: string;
  warningContainer: string;
  onWarningContainer: string;
  info: string;
  onInfo: string;
  infoContainer: string;
  onInfoContainer: string;
};

export type AppColors = MD3Theme['colors'] & AppExtraColors;
export type AppTheme = Omit<MD3Theme, 'colors'> & { colors: AppColors };

export const FONT_FAMILY = {
  regular: 'BeVietnamPro_400Regular',
  medium: 'BeVietnamPro_500Medium',
  semibold: 'BeVietnamPro_600SemiBold',
  bold: 'BeVietnamPro_700Bold',
} as const;

const variant = (fontFamily: string, fontSize: number, lineHeight: number, letterSpacing: number) => ({
  fontFamily,
  fontSize,
  lineHeight,
  letterSpacing,
  fontWeight: 'normal' as const,
});

const fonts = configureFonts({
  config: {
    displaySmall: variant(FONT_FAMILY.bold, 36, 44, -0.5),
    headlineLarge: variant(FONT_FAMILY.bold, 32, 40, -0.25),
    headlineMedium: variant(FONT_FAMILY.semibold, 28, 36, -0.25),
    headlineSmall: variant(FONT_FAMILY.semibold, 24, 32, 0),
    titleLarge: variant(FONT_FAMILY.semibold, 20, 28, 0),
    titleMedium: variant(FONT_FAMILY.semibold, 16, 24, 0.1),
    titleSmall: variant(FONT_FAMILY.medium, 14, 20, 0.1),
    labelLarge: variant(FONT_FAMILY.semibold, 14, 20, 0.1),
    labelMedium: variant(FONT_FAMILY.medium, 12, 16, 0.4),
    labelSmall: variant(FONT_FAMILY.medium, 11, 16, 0.4),
    bodyLarge: variant(FONT_FAMILY.regular, 16, 24, 0.15),
    bodyMedium: variant(FONT_FAMILY.regular, 14, 20, 0.25),
    bodySmall: variant(FONT_FAMILY.regular, 12, 16, 0.4),
  },
});

export const LIGHT_THEME: AppTheme = {
  ...MD3LightTheme,
  fonts,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#2E7D32',
    onPrimary: '#FFFFFF',
    primaryContainer: '#C8EBC4',
    onPrimaryContainer: '#0A3A0F',
    secondary: '#9A4A00',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#FFDCC2',
    onSecondaryContainer: '#321300',
    tertiary: '#4A6500',
    onTertiary: '#FFFFFF',
    tertiaryContainer: '#CBEF86',
    onTertiaryContainer: '#141F00',
    error: '#BA1A1A',
    onError: '#FFFFFF',
    errorContainer: '#FFDAD6',
    onErrorContainer: '#410002',
    background: '#F7FAF3',
    onBackground: '#191D17',
    surface: '#F7FAF3',
    onSurface: '#191D17',
    surfaceVariant: '#DEE5D8',
    onSurfaceVariant: '#424940',
    outline: '#72796F',
    outlineVariant: '#C2C9BD',
    inverseSurface: '#2E322B',
    inverseOnSurface: '#EFF2E9',
    inversePrimary: '#94D78F',
    shadow: '#000000',
    scrim: '#000000',
    backdrop: 'rgba(44, 50, 41, 0.4)',
    surfaceDisabled: 'rgba(25, 29, 23, 0.12)',
    onSurfaceDisabled: 'rgba(25, 29, 23, 0.38)',
    elevation: {
      level0: 'transparent',
      level1: '#FFFFFF',
      level2: '#F0F5EC',
      level3: '#E9F0E5',
      level4: '#E5EEE1',
      level5: '#E0EADC',
    },
    success: '#1B6E36',
    onSuccess: '#FFFFFF',
    successContainer: '#CDEFD5',
    onSuccessContainer: '#00210B',
    warning: '#7A5900',
    onWarning: '#FFFFFF',
    warningContainer: '#FFE08F',
    onWarningContainer: '#261A00',
    info: '#00639B',
    onInfo: '#FFFFFF',
    infoContainer: '#CEE5FF',
    onInfoContainer: '#001D33',
  },
};

export const DARK_THEME: AppTheme = {
  ...MD3DarkTheme,
  fonts,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#94D78F',
    onPrimary: '#00390A',
    primaryContainer: '#13531A',
    onPrimaryContainer: '#B0F4A9',
    secondary: '#FFB77F',
    onSecondary: '#512400',
    secondaryContainer: '#733600',
    onSecondaryContainer: '#FFDCC2',
    tertiary: '#B0D36C',
    onTertiary: '#253500',
    tertiaryContainer: '#374E00',
    onTertiaryContainer: '#CBEF86',
    error: '#FFB4AB',
    onError: '#690005',
    errorContainer: '#93000A',
    onErrorContainer: '#FFDAD6',
    background: '#111410',
    onBackground: '#E1E4DC',
    surface: '#111410',
    onSurface: '#E1E4DC',
    surfaceVariant: '#424940',
    onSurfaceVariant: '#C2C9BD',
    outline: '#8C9388',
    outlineVariant: '#424940',
    inverseSurface: '#E1E4DC',
    inverseOnSurface: '#2E322B',
    inversePrimary: '#2E7D32',
    shadow: '#000000',
    scrim: '#000000',
    backdrop: 'rgba(0, 0, 0, 0.6)',
    surfaceDisabled: 'rgba(225, 228, 220, 0.12)',
    onSurfaceDisabled: 'rgba(225, 228, 220, 0.38)',
    elevation: {
      level0: 'transparent',
      level1: '#1A2019',
      level2: '#1E251D',
      level3: '#222A21',
      level4: '#242C22',
      level5: '#273026',
    },
    success: '#8FD9A0',
    onSuccess: '#003916',
    successContainer: '#005322',
    onSuccessContainer: '#ABF5BB',
    warning: '#F0C048',
    onWarning: '#3F2E00',
    warningContainer: '#5B4300',
    onWarningContainer: '#FFE08F',
    info: '#96CCFF',
    onInfo: '#003353',
    infoContainer: '#004A75',
    onInfoContainer: '#CEE5FF',
  },
};

/** @deprecated use `useAppTheme()`; removed after the component migration. */
export const THEME = LIGHT_THEME;

/** @deprecated use `SIZE`; removed after the component migration. */
export const CUSTOM_THEME = {
  headerHeight: SIZE.appBarHeight,
};

const SCROLL_VIEW_DEFAULT: ViewStyle = {
  flex: 1,
  maxHeight: Dimensions.get('window').height - SIZE.appBarHeight,
};

type BASE_STYLE_KEY = 'CONTAINER_WRAP_BOT_BTN' | 'SCROLL_VIEW_DEFAULT' | 'SCROLL_VIEW_BOT_BTN' | 'SURFACE_DEFAULT';

type BASE_STYPE_TYPE = Record<BASE_STYLE_KEY, ViewStyle>;

/** @deprecated use `SPACE` / `RADIUS` / `SIZE`; removed after the component migration. */
export const BASE_STYLE: BASE_STYPE_TYPE = {
  CONTAINER_WRAP_BOT_BTN: {
    // container full -> allow bottom button stick at end
    flex: 1,
    // giving space to display bottom button
    paddingBottom: BOTTOM_BAR_HEIGHT,
  },

  SCROLL_VIEW_DEFAULT,

  SCROLL_VIEW_BOT_BTN: {
    ...SCROLL_VIEW_DEFAULT,
    paddingBottom: SPACE.md,
    maxHeight: (SCROLL_VIEW_DEFAULT.maxHeight as number) - BOTTOM_BAR_HEIGHT - SPACE.md,
  },

  SURFACE_DEFAULT: {
    padding: SPACE.md,
    borderRadius: RADIUS.md,
  },
};
