/* eslint-disable camelcase */
import { ScrollView, StyleSheet, View } from 'react-native';
import { BranchDto, SelectedLocation } from 'types';
import { BASE_STYLE, SPACE } from 'const';
import { useResponsiveLayout } from 'hooks';
import { setStorageItems } from 'utils';
import { useRecoilRefresher_UNSTABLE } from 'recoil';
import { selectedLocationSelector } from 'states';
import BranchItem from './BranchItem';

type Props = {
  branches: BranchDto[];
};

const BranchList = ({ branches }: Props) => {
  const { isPhone, isWide, getGridItemWidth } = useResponsiveLayout();
  const columns = (isPhone && 1) || (isWide && 3) || 2;
  const itemWidth = getGridItemWidth(columns);

  const refreshSelectedLocationSelector = useRecoilRefresher_UNSTABLE(selectedLocationSelector);

  // refer to handleSaveLocation from AdminDivisionSelector.tsx
  const handleChooseStore = async (branch: BranchDto) => {
    if (!branch?.ward?.parentDivision?.parentDivision?.id) {
      return;
    }

    const { ward } = branch;
    const { parentDivision: district } = ward;
    const { parentDivision: province } = district;

    const selectedLocation: SelectedLocation = {
      province: {
        id: province.id,
        fullname: province.fullname,
        name: province.name,
      },

      district: {
        id: district.id,
        fullname: district.fullname,
        name: district.name,
      },

      ward: {
        id: ward.id,
        fullname: ward.fullname,
        name: ward.name,
      },
    };

    await setStorageItems({ selectedLocation });
    refreshSelectedLocationSelector();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {branches.map(branch => (
        <View key={branch.id} style={{ width: itemWidth }}>
          <BranchItem branch={branch} onChooseStore={handleChooseStore} />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...BASE_STYLE.SCROLL_VIEW_BOT_BTN,
  },

  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACE.sm,
    padding: SPACE.md,
  },
});

export default BranchList;
