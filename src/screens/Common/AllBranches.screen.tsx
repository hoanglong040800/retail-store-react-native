import { useQuery } from '@tanstack/react-query';
import { ScreenAppBar } from 'components';
import { BranchList } from 'modules/branch';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { getBranchesByFitler } from 'service';
import { BranchDto } from 'types';

const AllBranchesScreen = () => {
  const { data: allBranches, isLoading } = useQuery<BranchDto[], null, BranchDto[]>({
    queryKey: ['allBranches'],
    queryFn: () => getBranchesByFitler(),
  });

  if (isLoading) {
    return <ActivityIndicator animating />;
  }

  return (
    <View style={styles.container}>
      <ScreenAppBar title="All Branches location" />

      <View style={styles.branchListContainer}>
        <BranchList branches={allBranches} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  branchListContainer: {
    marginHorizontal: 'auto',
  },
});

export default AllBranchesScreen;
