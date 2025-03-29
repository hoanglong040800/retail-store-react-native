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
const FLEX_RATIO = {
  search: 2.5,
  rightSide: 0.5,
};

const AppHeader = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFocusSearchbar, setIsFocusSeachbar] = useState(false);
  const { botSheetRef, onOpenBotSheet, onCloseBotSheet } = useBottomSheet({});
  const {
    searchText,
    recentSearchTexts,
    suggestSearches,
    isLoadingSearchResult,
    handleClickRecentSearchText,
    onChangeSearchText,
    handleClickSuggestedSearch,
  } = useHeaderSearch();

  const fadeAnim = useState(new Animated.Value(1))[0];
  const rightSideWidthAnim = useState(new Animated.Value(1))[0];
  const flexAnim = useState(new Animated.Value(1))[0];

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
        toValue: isFocus ? 0 : 1,
        duration,
        useNativeDriver: true, // Changed to true for smooth animation
      }),

      Animated.timing(flexAnim, {
        toValue: isFocus ? 0 : FLEX_RATIO.rightSide,
        duration,
        useNativeDriver: true, // Changed to true for smooth animation
      }),
    ]).start();
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
          />
        </Animated.View>

        {/* right side */}
        <Animated.View
          style={[
            styles.rightSide,
            {
              opacity: fadeAnim,
              flex: rightSideWidthAnim,
              transform: [
                {
                  scaleX: rightSideWidthAnim,
                },
              ],
            },
          ]}
        >
          <HeaderCart />

          <HeaderAccount />
        </Animated.View>
      </Appbar.Header>

      <CategoryDrawerModal isOpen={isDrawerOpen} onClose={onCloseDrawer} />

      <BottomSheet botSheetRef={botSheetRef} snapPoints={[BOTTOM_SHEET_HEIGHT]} transparentBackdrop>
        <HeaderSearchSuggestion
          recentSearchTexts={recentSearchTexts}
          suggestSearches={suggestSearches}
          isLoadingSearchResult={isLoadingSearchResult}
          onClickRecentText={handleClickRecentSearchText}
          onClickSuggestedSearch={handleClickSuggestedSearch}
        />
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },

  leftIcon: {
    backgroundColor: THEME.colors.primaryContainer,
  },

  search: {
    flex: FLEX_RATIO.search,
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
