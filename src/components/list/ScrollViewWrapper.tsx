import { ReactNode, useMemo } from 'react';
import { ScrollView, StyleProp, StyleSheet, ViewStyle } from 'react-native';

type Props = {
  direction?: 'row' | 'column' | 'both';
  itemSize?: 'S' | 'M' | 'L';
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
};

const ScrollViewWrapper = ({ direction = 'row', itemSize = 'M', style, children }: Props) => {
  const scrollViewStyle = useMemo<StyleProp<ViewStyle>>(() => {
    const sizeStyle = styles[`scrollView_${direction}${itemSize}`] || {};

    return [sizeStyle, styles.scrollViewDefault, style];
  }, [direction, itemSize, style]);

  const scrollContainerStyle = useMemo<StyleProp<ViewStyle>>(() => {
    return direction === 'both' ? styles.scrollContainer_both : {};
  }, [direction]);

  return (
    <ScrollView horizontal={direction === 'row'} style={scrollViewStyle} contentContainerStyle={scrollContainerStyle}>
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewDefault: {
    flex: 1,
    padding: 8,
  },

  scrollContainer_both: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
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
    minHeight: 280,
    maxHeight: 280,
  },
});

export default ScrollViewWrapper;
