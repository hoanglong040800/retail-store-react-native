import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { CUSTOM_THEME, THEME } from 'const';
import { useHeaderCart } from './hooks';

const HeaderSearch = () => {
  const [searchText, setSearchText] = useState('');
  const { renderCart } = useHeaderCart();

  const onChangeText = (value: string) => {
    setSearchText(value);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={searchText}
        onChangeText={onChangeText}
        mode="outlined"
        placeholder="Search"
        right={renderCart()}
        style={styles.searchBar}
        outlineStyle={styles.searchOutline}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  searchBar: {
    height: CUSTOM_THEME.headerHeight - 16,
  },

  searchOutline: {
    borderRadius: 99,
    borderColor: THEME.colors.primaryContainer,
  },
});

export default HeaderSearch;
