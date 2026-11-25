import { RADIUS, SIZE, SPACE } from 'const';
import { useAppTheme } from 'hooks';
import { Fragment, useMemo, useState } from 'react';
import { ScrollView, ScrollViewProps, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Divider, Icon, Searchbar, Surface, Text, TouchableRipple } from 'react-native-paper';
import { AdminDivisionDto } from 'types';

type Props = ScrollViewProps & {
  adminDivisions: AdminDivisionDto[];
  onSelectAdminDivision: (adminDivision: AdminDivisionDto) => void;
};

const SEARCH_MIN_ITEMS = 8;
const ROW_ICON_SIZE = 20;

const AdminDivisionList = ({ adminDivisions, onSelectAdminDivision, contentContainerStyle, ...props }: Props) => {
  const { colors } = useAppTheme();
  const [searchText, setSearchText] = useState('');

  const filteredDivisions = useMemo(() => {
    const keyword = searchText.trim().toLowerCase();

    if (!adminDivisions || !keyword) {
      return adminDivisions;
    }

    return adminDivisions.filter(({ fullname }) => fullname.toLowerCase().includes(keyword));
  }, [adminDivisions, searchText]);

  if (!adminDivisions) {
    return <ActivityIndicator animating />;
  }

  return (
    <ScrollView contentContainerStyle={[styles.scrollContentContainer, contentContainerStyle]} {...props}>
      {adminDivisions.length > SEARCH_MIN_ITEMS && (
        <Searchbar
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search"
          style={[styles.search, { backgroundColor: colors.elevation.level1 }]}
        />
      )}

      <Surface elevation={1} style={styles.card}>
        {filteredDivisions.map((adminDivision, index) => (
          <Fragment key={adminDivision.id}>
            {index > 0 && <Divider />}

            <TouchableRipple onPress={() => onSelectAdminDivision(adminDivision)} style={styles.row}>
              <View style={styles.rowContent}>
                <Text variant="bodyLarge" style={styles.rowText}>
                  {adminDivision.fullname}
                </Text>
                <Icon source="chevron-right" size={ROW_ICON_SIZE} color={colors.onSurfaceVariant} />
              </View>
            </TouchableRipple>
          </Fragment>
        ))}
      </Surface>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContentContainer: {
    gap: SPACE.sm,
  },

  search: {
    borderRadius: RADIUS.full,
  },

  card: {
    borderRadius: RADIUS.md,
    overflow: 'hidden',
  },

  row: {
    minHeight: SIZE.listRowHeight,
    justifyContent: 'center',
    paddingHorizontal: SPACE.md,
  },

  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.xs,
  },

  rowText: {
    flex: 1,
  },
});

export default AdminDivisionList;
