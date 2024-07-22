import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { ParamsType, Screen } from 'types';
import { THEME } from 'const';
import { useAppNavigation } from 'hooks';
import { globalConfigState } from 'states';
import CategoryList from './CategoryList';

type Props = {
  callbackAfterPressCategory?: () => void;
};

const CategoryDrawer = ({ callbackAfterPressCategory = () => null }: Props) => {
  const { navigate } = useAppNavigation();

  const { categories } = useRecoilValue(globalConfigState);

  const [curMainIndex, setCurMainIndex] = useState<number>(0);

  const onPressMainCategory = (index: number) => {
    setCurMainIndex(index);
  };

  const onPressSubCategory = (index: number) => {
    const mainCate = categories[curMainIndex];
    const subCate = mainCate?.childCategories?.[index];

    const params: ParamsType = {
      mainCate: {
        id: mainCate?.id,
        name: mainCate?.name,
      },

      subCate: {
        id: subCate?.id,
        name: subCate?.name,
      },
    };

    navigate(Screen.ProductList, params);
    callbackAfterPressCategory();
  };

  return (
    <View style={styles.layout}>
      <CategoryList list={categories} onPressItem={onPressMainCategory} style={styles.leftCate} />

      <View style={styles.rightCate}>
        <CategoryList
          list={categories[curMainIndex].childCategories}
          direction="both"
          onPressItem={onPressSubCategory}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'row',
    flex: 1,
  },

  leftCate: {
    backgroundColor: THEME.colors.elevation.level5,
    maxWidth: 150,
    paddingBottom: 16,
  },

  rightCate: {
    padding: 8,
    flex: 1,
    backgroundColor: THEME.colors.elevation.level1,
  },
});

export default CategoryDrawer;
