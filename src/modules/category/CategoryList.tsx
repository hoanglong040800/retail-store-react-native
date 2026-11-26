import { SPACE } from 'const';
import { ScrollView, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { CategoryDto } from 'types';
import CategoryItem, { CategoryItemVariant } from './CategoryItem';

type Props = {
  list: CategoryDto[];
  direction?: 'row' | 'column' | 'both';
  selectedId?: string;
  style?: StyleProp<ViewStyle>;

  onPressItem?: (index: number, id: string) => void;
};

// row = filter chip strip, column = side rail, both = tile grid
const VARIANT_BY_DIRECTION: Record<NonNullable<Props['direction']>, CategoryItemVariant> = {
  row: 'chip',
  column: 'rail',
  both: 'tile',
};

const CategoryList = ({ list, direction = 'column', selectedId, style, onPressItem }: Props) => {
  // TODO reusing ScrollViewWrapper
  return (
    <ScrollView
      horizontal={direction === 'row'}
      style={[direction === 'row' ? styles.scrollView_row : styles.scrollViewDefault, style]}
      contentContainerStyle={styles[`scrollContainer_${direction}`]}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      {list?.map((cate, index) => (
        <CategoryItem
          key={cate.name}
          name={cate.name}
          icon={cate.icon}
          variant={VARIANT_BY_DIRECTION[direction]}
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
  },

  scrollView_row: {
    flexGrow: 0,
  },

  scrollContainer_row: {
    gap: SPACE.xs,
    paddingHorizontal: SPACE.md,
    paddingVertical: SPACE.xs,
    alignItems: 'center',
  },

  scrollContainer_column: {},

  scrollContainer_both: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACE.sm,
  },
});

export default CategoryList;
