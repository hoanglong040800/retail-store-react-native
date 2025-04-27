import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { CUSTOM_THEME } from 'const';

type Props = {
  searchText: string;
  onChangeSearchText: (value: string) => Promise<void>;
  handleChangeFocus: (isFocus: boolean) => void;
  onPressSearch: (searchText: string) => void;
};

const HeaderSearch = ({ searchText, onChangeSearchText, handleChangeFocus, onPressSearch }: Props) => {
  const onFocus = () => {
    handleChangeFocus(true);
  };

  const onSubmitEditing = () => {
    onPressSearch(searchText);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={searchText}
        onChangeText={onChangeSearchText}
        mode="outlined"
        placeholder="Search"
        onFocus={onFocus}
        style={styles.searchBar}
        contentStyle={styles.searchOutline}
        outlineStyle={styles.searchOutline}
        onSubmitEditing={onSubmitEditing}
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
    borderTopLeftRadius: 99,
    borderBottomLeftRadius: 99,
    borderTopRightRadius: 0,
    borderBottomEndRadius: 0,
  },

  searchOutline: {
    borderRadius: 99,
    borderColor: '#fff',
  },
});

export default HeaderSearch;
