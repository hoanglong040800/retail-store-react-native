import { CUSTOM_THEME, THEME } from 'const';
import { HeaderSearch } from 'modules';
import { CategoryDrawerModal } from 'modules/category';
import HeaderAccount from 'modules/header/HeaderAccount';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';

const AppHeader = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const onCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <Appbar.Header style={styles.header}>
        <Appbar.Action icon="menu" onPress={toggleDrawer} style={styles.leftIcon} size={18} />

        <View style={styles.search}>
          <HeaderSearch />
        </View>

        <View style={styles.accountCon}>
          <HeaderAccount />
        </View>
      </Appbar.Header>

      <CategoryDrawerModal isOpen={isDrawerOpen} onClose={onCloseDrawer} />
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
  },

  leftIcon: {
    backgroundColor: THEME.colors.primaryContainer,
  },

  search: {
    flex: 1,
  },

  accountCon: {
    marginLeft: 8,
  },
});

export default AppHeader;
