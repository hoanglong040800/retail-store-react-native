import { Image, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Chip, List, Text } from 'react-native-paper';
import { SuggestedSearch } from 'types';
import { getDisplayStyle } from 'utils';

type Props = {
  recentSearchTexts: string[];
  suggestSearches: SuggestedSearch[];
  isLoadingSearchResult: boolean;
  onClickRecentText: (index: number) => void;
  onClickSuggestedSearch: (suggestSearch: SuggestedSearch) => void;
};

const HeaderSearchSuggestion = ({
  recentSearchTexts,
  suggestSearches,
  isLoadingSearchResult,
  onClickRecentText,
  onClickSuggestedSearch,
}: Props) => {
  const renderImage = productImage => {
    return <Image source={{ uri: productImage, width: 20, height: 20 }} />;
  };

  return (
    <View style={styles.container}>
      {/* Recent search history */}
      <View style={getDisplayStyle(!!recentSearchTexts.length)}>
        <Text variant="bodyLarge">Recent search history</Text>

        <View style={styles.recentChipCon}>
          {recentSearchTexts.map((text, index) => (
            <Chip mode="outlined" onPress={() => onClickRecentText(index)} key={text}>
              {text}
            </Chip>
          ))}
        </View>
      </View>

      {/* Suggested search */}
      <List.Section style={[getDisplayStyle(!!suggestSearches.length), styles.suggestedChipCon]}>
        <Text variant="bodyLarge">Suggested search result</Text>

        {isLoadingSearchResult && <ActivityIndicator />}

        {!isLoadingSearchResult &&
          suggestSearches?.map(search => (
            <List.Item
              left={() => renderImage(search.productImage)}
              title={search.productName}
              key={search.productId}
              onPress={() => onClickSuggestedSearch(search)}
            />
          ))}
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },

  recentChipCon: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },

  suggestedChipCon: {
    gap: 8,
    marginTop: 8,
  },
});

export default HeaderSearchSuggestion;
