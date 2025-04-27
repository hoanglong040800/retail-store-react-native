import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import { CategoryDto, ParamsType, Screen } from 'types';
import { THEME } from 'const';
import { useAppNavigation } from 'hooks';
import { globalConfigState } from 'states';
import CategoryList from './CategoryList';

const EXTRA_SELECTION_SCREEN: Record<string, Screen> = {
  ALL_STORES: Screen.AllBranches,
};

const EXTRA_SELECTION_TOP: CategoryDto[] = [
  {
    id: '0',
    name: 'More',
    icon: 'https://cdn-icons-png.flaticon.com/512/1041/1041883.png',
    level: 1,
    isLeaf: false,
    childCategories: [
      {
        id: EXTRA_SELECTION_SCREEN.ALL_STORES,
        name: 'View all stores',
        icon: 'https://cdn-icons-png.flaticon.com/512/8771/8771926.png',
        isLeaf: true,
        level: 2,
      },
    ],
  },
];

type Props = {
  callbackAfterPressCategory?: () => void;
};

const CategoryDrawer = ({ callbackAfterPressCategory = () => null }: Props) => {
  const { navigate } = useAppNavigation();

  const { categories } = useRecoilValue(globalConfigState);

  const [curMainIndex, setCurMainIndex] = useState<number>(1);

  const sidebarList = useMemo<CategoryDto[]>(() => {
    const newSidebar: CategoryDto[] = [...EXTRA_SELECTION_TOP, ...(categories || [])];

    return newSidebar;
  }, [categories, EXTRA_SELECTION_TOP]);

  // FUNCTIONS

  const onPressMainCategory = (index: number) => {
    setCurMainIndex(index);
  };

  const onPressSubCategory = (index: number, id: string) => {
    if (id === Screen.AllBranches) {
      onPressExtraSelectionScreen(id as Screen);
      callbackAfterPressCategory();
      return;
    }

    const mainCate = sidebarList[curMainIndex];
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

  const onPressExtraSelectionScreen = (extraScreen: Screen) => {
    navigate(extraScreen);
  };

  return (
    <View style={styles.layout}>
      <CategoryList
        list={sidebarList}
        onPressItem={onPressMainCategory}
        selectedId={sidebarList[curMainIndex]?.id}
        style={styles.leftCate}
      />

      <View style={styles.rightCate}>
        <CategoryList
          list={sidebarList[curMainIndex].childCategories}
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
    backgroundColor: THEME.colors.elevation.level1,
    maxWidth: 150,
    paddingBottom: 16,
  },

  rightCate: {
    padding: 8,
    flex: 1,
    backgroundColor: THEME.colors.elevation.level0,
  },
});

export default CategoryDrawer;
