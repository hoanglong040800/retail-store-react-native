import { ReactNode, useMemo } from 'react';
import { SPACE } from 'const';
import { ScrollView, StyleProp, StyleSheet, ViewStyle } from 'react-native';

type Props = {
  direction?: 'row' | 'column' | 'both';
  itemSize?: 'S' | 'M' | 'L';
  hideScrollbar?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
};

const ScrollViewWrapper = ({ direction = 'row', itemSize = 'M', hideScrollbar, style, children }: Props) => {
  const scrollViewStyle = useMemo<StyleProp<ViewStyle>>(() => {
    const sizeStyle = styles[`scrollView_${direction}${itemSize}`] || {};

    return [sizeStyle, styles.scrollViewDefault, style];
  }, [direction, itemSize, style]);

  const scrollContainerStyle = useMemo<StyleProp<ViewStyle>>(() => {
    return direction === 'both' ? styles.scrollContainer_both : styles.scrollContainer_line;
  }, [direction]);

  return (
    <ScrollView
      horizontal={direction === 'row'}
      style={scrollViewStyle}
      contentContainerStyle={scrollContainerStyle}
      showsVerticalScrollIndicator={!hideScrollbar}
      showsHorizontalScrollIndicator={!hideScrollbar}
    >
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewDefault: {
    flex: 1,
  },

  scrollContainer_line: {
    gap: SPACE.sm,
    padding: SPACE.md,
  },

  scrollContainer_both: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACE.sm,
    padding: SPACE.md,
  },

  scrollView_rowS: {
    minHeight: 120,
    maxHeight: 120,
  },

  scrollView_rowM: {
    minHeight: 170,
    maxHeight: 170,
  },

  scrollView_rowL: {
    minHeight: 340,
    maxHeight: 340,
  },
});

export default ScrollViewWrapper;
