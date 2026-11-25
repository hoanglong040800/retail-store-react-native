import { RADIUS, SPACE } from 'const';
import { useAppTheme } from 'hooks';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Surface, Text } from 'react-native-paper';
import { BranchDto } from 'types';

type Props = {
  branch: BranchDto;
  onChooseStore: (branch: BranchDto) => void | Promise<void>;
};

const STORE_ICON_SIZE = 24;
const STORE_ICON_BOX = 40;
const SMALL_BUTTON_HEIGHT = 36;

const BranchItem = ({ branch, onChooseStore }: Props) => {
  const { colors } = useAppTheme();

  return (
    <Surface elevation={1} style={styles.container}>
      <View style={[styles.storeIcon, { backgroundColor: colors.primaryContainer }]}>
        <Icon source="store-outline" size={STORE_ICON_SIZE} color={colors.onPrimaryContainer} />
      </View>

      <View style={styles.content}>
        <Text variant="titleSmall">{branch.name}</Text>

        <Text variant="bodySmall" numberOfLines={2} style={{ color: colors.onSurfaceVariant }}>
          {branch.ward.fullname}, {branch.ward.parentDivision.fullname},{' '}
          {branch.ward.parentDivision.parentDivision.fullname}
        </Text>
      </View>

      <Button mode="contained-tonal" compact contentStyle={styles.buttonContent} onPress={() => onChooseStore(branch)}>
        Choose Store
      </Button>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.sm,
    padding: SPACE.md,
    borderRadius: RADIUS.md,
  },

  storeIcon: {
    width: STORE_ICON_BOX,
    height: STORE_ICON_BOX,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    flex: 1,
    gap: SPACE.xxs,
  },

  buttonContent: {
    height: SMALL_BUTTON_HEIGHT,
  },
});

export default BranchItem;
