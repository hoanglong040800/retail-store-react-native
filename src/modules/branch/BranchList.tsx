/* eslint-disable camelcase */
import { ScrollView, StyleSheet } from 'react-native';
import { BranchDto, SelectedLocation } from 'types';
import { BASE_STYLE } from 'const';
import { setStorageItems } from 'utils';
import { useRecoilRefresher_UNSTABLE } from 'recoil';
import { selectedLocationSelector } from 'states';
import BranchItem from './BranchItem';

type Props = {
  branches: BranchDto[];
};

const BranchList = ({ branches }: Props) => {
  const refreshSelectedLocationSelector = useRecoilRefresher_UNSTABLE(selectedLocationSelector);

  // refer to handleSaveLocation from AdminDivisionSelector.tsx
  const handleChooseStore = async (branch: BranchDto) => {
    console.log('handleChooseStore', branch);
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
        <BranchItem branch={branch} key={branch.id} onChooseStore={handleChooseStore} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...BASE_STYLE.SCROLL_VIEW_BOT_BTN,
    minWidth: 500,
    maxWidth: 768,
    padding: 16,
  },

  contentContainer: {
    gap: 16,
  },
});

export default BranchList;
