import { StyleSheet, View } from 'react-native';
import { Chip, Text } from 'react-native-paper';
import { getDisplayStyle } from 'utils';

type Props = {
  recentSearchTexts: string[];
  onClickRecentText: (index: number) => void;
};

const HeaderSearchSuggestion = ({ recentSearchTexts, onClickRecentText }: Props) => {
  return (
    <View>
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

      {/* API search result */}
    </View>
  );
};

const styles = StyleSheet.create({
  recentChipCon: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
});

export default HeaderSearchSuggestion;
