import { useMemo } from 'react';
import { ScrollView, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { CategoryDto } from 'types';
import CategoryItem from './CategoryItem';

type Props = {
  list: CategoryDto[];
  direction?: 'row' | 'column' | 'both';
  itemSize?: 'S' | 'M';
  selectedId?: string;
  style?: StyleProp<ViewStyle>;

  onPressItem?: (index: number, id: string) => void;
};

const CategoryList = ({ list, direction = 'column', itemSize = 'M', selectedId, style, onPressItem }: Props) => {
  const scrollViewStyle = useMemo<StyleProp<ViewStyle>>(() => {
    const sizeStyle = styles[`scrollView_${direction}${itemSize}`] || {};

    return [sizeStyle, styles.scrollViewDefault, style];
  }, [direction, itemSize, style]);

  const scrollContainerStyle = useMemo<StyleProp<ViewStyle>>(() => {
    return styles[`scrollContainer_${direction}`] || {};
  }, [direction]);

  // TODO reusing ScrollViewWrapper
  return (
    <ScrollView
      horizontal={direction === 'row'}
      style={scrollViewStyle}
      contentContainerStyle={scrollContainerStyle}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      {list?.map((cate, index) => (
        <CategoryItem
          key={cate.name}
          name={cate.name}
          icon={cate.icon}
          size={itemSize}
          isHighlighted={selectedId ? cate.id === selectedId : null}
          onPress={() => onPressItem(index, cate.id)}
        />
      ))}
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
    gap: 12,
  },

  scrollContainer_column: {
    gap: 12,
  },

  scrollView_rowS: {
    minHeight: 90,
    maxHeight: 100,
  },

  scrollView_rowM: {
    minHeight: 170,
    maxHeight: 170,
  },
});

export default CategoryList;
