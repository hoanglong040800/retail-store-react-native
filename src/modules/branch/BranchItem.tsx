import { DeSurface } from 'components';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Text } from 'react-native-paper';
import { BranchDto } from 'types';

type Props = {
  branch: BranchDto;
};

const BranchItem = ({ branch }: Props) => {
  return (
    <DeSurface style={styles.container}>
      <View style={styles.contentContainer}>
        <Icon source="store" size={30} />

        <View>
          <Text variant="labelLarge">{branch.name}</Text>

          <Text>
            {branch.ward.fullname}, {branch.ward.parentDivision.fullname},{' '}
            {branch.ward.parentDivision.parentDivision.fullname}
          </Text>
        </View>
      </View>

      <View style={styles.footerButton}>
        <Button>Choose Store</Button>
      </View>
    </DeSurface>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 110,
    justifyContent: 'space-between',
  },

  contentContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },

  footerButton: {
    alignItems: 'flex-end',
  },
});

export default BranchItem;
