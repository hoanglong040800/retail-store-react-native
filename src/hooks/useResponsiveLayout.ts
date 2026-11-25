import { BREAKPOINT, SIZE, SPACE } from 'const';
import { useWindowDimensions } from 'react-native';

const getGridColumns = (width: number): number => {
  if (width < BREAKPOINT.sm) {
    return 2;
  }

  if (width < BREAKPOINT.md) {
    return 3;
  }

  if (width < BREAKPOINT.lg) {
    return 4;
  }

  return 5;
};

export const useResponsiveLayout = () => {
  const { width } = useWindowDimensions();
  const contentWidth = Math.min(width, SIZE.contentMaxWidth);

  const getGridItemWidth = (columns: number, gutter: number = SPACE.md, gap: number = SPACE.sm): number =>
    (contentWidth - gutter * 2 - gap * (columns - 1)) / columns;

  return {
    width,
    contentWidth,
    isPhone: width < BREAKPOINT.sm,
    isWide: width >= BREAKPOINT.md,
    gridColumns: getGridColumns(width),
    getGridItemWidth,
  };
};
