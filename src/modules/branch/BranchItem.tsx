import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { BranchDto } from 'types';

type Props = {
  branch: BranchDto;
};

const BranchItem = ({ branch }: Props) => {
  return (
    <View>
      <Text>{branch.name}</Text>

      <Text>
        {branch.ward.name}, {branch.ward.parentDivision.name}, {branch.ward.parentDivision.parentDivision.name}
      </Text>
    </View>
  );
};

export default BranchItem;
