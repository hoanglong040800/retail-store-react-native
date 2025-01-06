import { BASE_STYLE } from 'const';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Surface, Text } from 'react-native-paper';
import { BranchDto } from 'types';

type Props = {
  branch: BranchDto;
  onChooseStore: (branch: BranchDto) => void | Promise<void>;
};

const BranchItem = ({ branch, onChooseStore }: Props) => {
  return (
    <Surface style={styles.container}>
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
        <Button onPress={() => onChooseStore(branch)}>Choose Store</Button>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    ...BASE_STYLE.SURFACE_DEFAULT,
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
