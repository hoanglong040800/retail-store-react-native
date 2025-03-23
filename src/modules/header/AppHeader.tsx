import { BottomSheet, useBottomSheet } from 'components/bottom-sheet';
import { CUSTOM_THEME, THEME } from 'const';
import { HeaderCart } from 'modules';
import { CategoryDrawerModal } from 'modules/category';
import HeaderAccount from 'modules/header/HeaderAccount';
import { useHeaderSearch } from 'modules/header/hooks';
import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { getHiddenDisplayStyle } from 'utils';
import { HeaderSearch, HeaderSearchSuggestion } from './search';

const BOTTOM_SHEET_HEIGHT = Dimensions.get('window').height - CUSTOM_THEME.headerHeight;

const AppHeader = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFocusSearchbar, setIsFocusSeachbar] = useState(false);
  const { botSheetRef, onOpenBotSheet, onCloseBotSheet } = useBottomSheet({});
  const { searchText, onChangeSearchText } = useHeaderSearch();

  // -- FUNCTIONS --

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const onCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleChangeFocus = (isFocus: boolean) => {
    setIsFocusSeachbar(isFocus);
  };

  const handlePressBack = () => {
    handleChangeFocus(false);
    onCloseBotSheet();
  };

  // -- EFFECT --

  useEffect(() => {
    if (isFocusSearchbar) {
      onOpenBotSheet();
    }
  }, [isFocusSearchbar, onOpenBotSheet]);

  return (
    <>
      <Appbar.Header style={styles.header}>
        {isFocusSearchbar ? (
          <Appbar.BackAction onPress={handlePressBack} style={styles.leftIcon} size={18} />
        ) : (
          <Appbar.Action icon="menu" onPress={toggleDrawer} style={styles.leftIcon} size={18} />
        )}

        <View style={styles.search}>
          <HeaderSearch
            searchText={searchText}
            onChangeSearchText={onChangeSearchText}
            handleChangeFocus={handleChangeFocus}
          />

          <View style={getHiddenDisplayStyle(isFocusSearchbar)}>
            <HeaderCart />
          </View>
        </View>

        <View style={getHiddenDisplayStyle(isFocusSearchbar, styles.accountCon)}>
          <HeaderAccount />
        </View>
      </Appbar.Header>

      <CategoryDrawerModal isOpen={isDrawerOpen} onClose={onCloseDrawer} />

      <BottomSheet botSheetRef={botSheetRef} snapPoints={[BOTTOM_SHEET_HEIGHT]} transparentBackdrop>
        <HeaderSearchSuggestion />
      </BottomSheet>
    </>
  );
};

// TODO animate header expansion
const styles = StyleSheet.create({
  header: {
    backgroundColor: THEME.colors.primaryContainer,
    height: CUSTOM_THEME.headerHeight,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },

  leftIcon: {
    backgroundColor: THEME.colors.primaryContainer,
  },

  search: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  accountCon: {
    marginLeft: 8,
  },
});

export default AppHeader;
