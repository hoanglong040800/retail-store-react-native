// Mirrors design-system/tokens.json (space, radius, size, breakpoint).

export const SPACE = {
  none: 0,
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 28,
  full: 999,
} as const;

export const SIZE = {
  appBarHeight: 56,
  touchTarget: 44,
  buttonHeight: 48,
  inputHeight: 52,
  iconSm: 16,
  iconMd: 24,
  productCardWidth: 172,
  productImage: 172,
  contentMaxWidth: 1200,
  listRowHeight: 56,
  chipHeight: 32,
  locationChipHeight: 40,
  categoryRailWidth: 88,
  categoryRailIcon: 40,
  categoryTileImage: 64,
  sidePanelWidth: 360,
  dialogMaxWidth: 560,
} as const;

export const BREAKPOINT = {
  sm: 600,
  md: 905,
  lg: 1240,
} as const;

// Derived: fixed bottom button bar (button + vertical padding).
export const BOTTOM_BAR_HEIGHT = SIZE.buttonHeight + SPACE.sm * 2;
