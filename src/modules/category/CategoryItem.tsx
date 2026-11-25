import { RADIUS, SIZE, SPACE } from 'const';
import { useAppTheme } from 'hooks';
import { Image, StyleSheet, View } from 'react-native';
import { Chip, Text, TouchableRipple } from 'react-native-paper';

export type CategoryItemVariant = 'rail' | 'tile' | 'chip';

type Props = {
  icon: string;
  name: string;
  variant?: CategoryItemVariant;
  isHighlighted?: boolean;

  onPress: () => void;
};

const RAIL_ITEM_HEIGHT = 80;
const RAIL_INDICATOR_WIDTH = 3;
const TILE_WIDTH = 80;

const CategoryItem = ({ icon, name, variant = 'tile', isHighlighted, onPress = () => null }: Props) => {
  const { colors } = useAppTheme();

  if (variant === 'chip') {
    return (
      <Chip
        selected={!!isHighlighted}
        showSelectedCheck
        onPress={onPress}
        style={[styles.chip, { backgroundColor: isHighlighted ? colors.primaryContainer : colors.elevation.level1 }]}
        selectedColor={isHighlighted ? colors.onPrimaryContainer : colors.onSurface}
      >
        {name}
      </Chip>
    );
  }

  if (variant === 'rail') {
    return (
      <TouchableRipple onPress={onPress} style={[styles.rail, isHighlighted && { backgroundColor: colors.surface }]}>
        <>
          {isHighlighted && <View style={[styles.railIndicator, { backgroundColor: colors.primary }]} />}

          <View style={[styles.railIcon, { backgroundColor: colors.surface }]}>
            <Image source={{ uri: icon }} style={styles.railImage} />
          </View>

          <Text
            variant="labelSmall"
            numberOfLines={2}
            style={[
              styles.centerText,
              isHighlighted ? [styles.railTextSelected, { color: colors.primary }] : { color: colors.onSurfaceVariant },
            ]}
          >
            {name}
          </Text>
        </>
      </TouchableRipple>
    );
  }

  return (
    <TouchableRipple onPress={onPress} borderless style={styles.tile}>
      <>
        <View style={[styles.tileImageBox, { backgroundColor: colors.elevation.level1 }]}>
          <Image source={{ uri: icon }} style={styles.tileImage} />
        </View>

        <Text variant="labelMedium" numberOfLines={2} style={styles.centerText}>
          {name}
        </Text>
      </>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  chip: {
    height: SIZE.chipHeight,
    borderRadius: RADIUS.sm,
  },

  rail: {
    width: SIZE.categoryRailWidth,
    minHeight: RAIL_ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACE.xxs,
    paddingHorizontal: SPACE.xxs,
    paddingVertical: SPACE.xs,
  },

  railIndicator: {
    position: 'absolute',
    left: 0,
    top: SPACE.xs,
    bottom: SPACE.xs,
    width: RAIL_INDICATOR_WIDTH,
    borderRadius: RADIUS.xs,
  },

  railIcon: {
    width: SIZE.categoryRailIcon,
    height: SIZE.categoryRailIcon,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },

  railImage: {
    width: SIZE.iconMd,
    height: SIZE.iconMd,
  },

  railTextSelected: {
    fontWeight: '600',
  },

  tile: {
    width: TILE_WIDTH,
    alignItems: 'center',
    gap: SPACE.xxs,
    borderRadius: RADIUS.md,
  },

  tileImageBox: {
    width: SIZE.categoryTileImage,
    height: SIZE.categoryTileImage,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
  },

  tileImage: {
    width: '100%',
    height: '100%',
  },

  centerText: {
    textAlign: 'center',
  },
});

export default CategoryItem;
