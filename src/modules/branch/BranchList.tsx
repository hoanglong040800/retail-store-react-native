import { View } from 'react-native';
import { BranchDto } from 'types';
import BranchItem from './BranchItem';

type Props = {
  branches: BranchDto[];
};

const BranchList = ({ branches }: Props) => {
  return (
    <View>
      {branches.map(branch => (
        <BranchItem branch={branch} />
      ))}
    </View>
  );
};

export default BranchList;
