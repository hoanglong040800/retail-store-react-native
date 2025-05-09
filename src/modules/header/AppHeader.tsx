import { BottomSheet, useBottomSheet } from 'components/bottom-sheet';
import { CUSTOM_THEME, THEME } from 'const';
import { HeaderCart } from 'modules';
import { CategoryDrawerModal } from 'modules/category';
import HeaderAccount from 'modules/header/HeaderAccount';
import { useHeaderSearch } from 'modules/header/hooks';
import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Animated } from 'react-native';
import { Appbar } from 'react-native-paper';
import { HeaderSearch, HeaderSearchSuggestion } from './search';

const BOTTOM_SHEET_HEIGHT = Dimensions.get('window').height - CUSTOM_THEME.headerHeight;

const LEFT_SIDE_WIDTH = 100;

const AppHeader = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFocusSearchbar, setIsFocusSeachbar] = useState(false);
  const { botSheetRef, onOpenBotSheet, onCloseBotSheet } = useBottomSheet({});

  const handlePressBack = () => {
    handleChangeFocus(false);
    onCloseBotSheet();
  };

  const {
    searchText,
    recentSearchTexts,
    suggestSearches,
    isLoadingSearchResult,
    handleClickRecentSearchText,
    onChangeSearchText,
    handleClickSuggestedSearch,
    handlePressEnterOrClickSearch,
  } = useHeaderSearch({ onPressBack: handlePressBack, isFocusSearchBar: isFocusSearchbar });

  const fadeAnim = useState(new Animated.Value(1))[0];
  const rightSideWidthAnim = useState(new Animated.Value(LEFT_SIDE_WIDTH))[0];

  // -- FUNCTIONS --

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const onCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleChangeFocus = (isFocus: boolean) => {
    setIsFocusSeachbar(isFocus);

    const duration = 200;

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: isFocus ? 0 : 1,
        duration,
        useNativeDriver: true,
      }),

      Animated.timing(rightSideWidthAnim, {
        toValue: isFocus ? 0 : LEFT_SIDE_WIDTH,
        duration,
        useNativeDriver: true,
      }),
    ]).start();
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
        {/* left side */}
        {isFocusSearchbar ? (
          <Appbar.BackAction onPress={handlePressBack} style={styles.leftIcon} size={18} />
        ) : (
          <Appbar.Action icon="menu" onPress={toggleDrawer} style={styles.leftIcon} size={18} />
        )}

        <Animated.View style={[styles.search]}>
          <HeaderSearch
            searchText={searchText}
            onChangeSearchText={onChangeSearchText}
            handleChangeFocus={handleChangeFocus}
            onPressSearch={handlePressEnterOrClickSearch}
          />
        </Animated.View>

        {/* right side */}
        <Animated.View
          style={[
            styles.rightSide,
            {
              opacity: fadeAnim,
              width: rightSideWidthAnim,
            },
          ]}
        >
          <HeaderCart />

          <HeaderAccount />
        </Animated.View>
      </Appbar.Header>

      <CategoryDrawerModal isOpen={isDrawerOpen} onClose={onCloseDrawer} />

      <BottomSheet botSheetRef={botSheetRef} snapPoints={[BOTTOM_SHEET_HEIGHT]} transparentBackdrop>
        {isFocusSearchbar && (
          <HeaderSearchSuggestion
            recentSearchTexts={recentSearchTexts}
            suggestSearches={suggestSearches}
            isLoadingSearchResult={isLoadingSearchResult}
            onClickRecentText={handleClickRecentSearchText}
            onClickSuggestedSearch={handleClickSuggestedSearch}
          />
        )}
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: THEME.colors.primaryContainer,
    height: CUSTOM_THEME.headerHeight,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    flex: 1,
  },

  leftIcon: {
    backgroundColor: THEME.colors.primaryContainer,
    width: 34,
  },

  search: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export default AppHeader;
