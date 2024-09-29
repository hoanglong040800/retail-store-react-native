import { useQuery } from '@tanstack/react-query';
import { ScreenAppBar } from 'components';
import { BranchList } from 'modules/branch';
import { View } from 'react-native';
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
    <View>
      <ScreenAppBar title="All Branches location" />

      <BranchList branches={allBranches} />
    </View>
  );
};

export default AllBranchesScreen;
