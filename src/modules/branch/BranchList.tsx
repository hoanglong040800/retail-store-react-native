import { ScrollView, StyleSheet } from 'react-native';
import { BranchDto } from 'types';
import BranchItem from './BranchItem';

type Props = {
  branches: BranchDto[];
};

const BranchList = ({ branches }: Props) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {branches.map(branch => (
        <BranchItem branch={branch} key={branch.id} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 500,
    maxWidth: 768,
    maxHeight: 700,
    padding: 16,
  },

  contentContainer: {
    gap: 16,
  },
});

export default BranchList;
