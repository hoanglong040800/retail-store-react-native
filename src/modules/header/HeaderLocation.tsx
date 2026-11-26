import { DeModal } from 'components';
import { RADIUS, SIZE, SPACE } from 'const';
import { useAppTheme, useModal } from 'hooks';
import { AdminDivisionSelector } from 'modules/admin-division';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text, TouchableRipple } from 'react-native-paper';
import { useRecoilValue } from 'recoil';
import { globalConfigState, selectedLocationSelector } from 'states';
import { GetGlobalConfigDto, SelectedLocation } from 'types';

const CHIP_ICON_SIZE = 20;

const HeaderLocation = () => {
  const { colors } = useAppTheme();
  const { isOpen, onOpen, onClose } = useModal();
  const { deliveryProvinces } = useRecoilValue<GetGlobalConfigDto>(globalConfigState);
  // GS shorthand for global state
  const selectedLocationGS = useRecoilValue<SelectedLocation>(selectedLocationSelector);

  const locationText = useMemo((): string | null => {
    const { province, district, ward } = selectedLocationGS || {};

    if (province && district && ward) {
      return `${ward.fullname}, ${district.fullname}, ${province.fullname}`;
    }

    return null;
  }, [selectedLocationGS]);

  return (
    <>
      <View style={styles.container}>
        <TouchableRipple
          onPress={onOpen}
          borderless
          style={[styles.chip, { backgroundColor: colors.elevation.level1, borderColor: colors.outlineVariant }]}
        >
          <View style={styles.chipContent}>
            <Icon source="map-marker-outline" size={CHIP_ICON_SIZE} color={colors.primary} />

            <Text
              variant="labelLarge"
              numberOfLines={1}
              style={[styles.chipText, { color: locationText ? colors.onSurface : colors.primary }]}
            >
              {locationText || 'Choose store'}
            </Text>

            <Icon source="chevron-down" size={CHIP_ICON_SIZE} color={colors.onSurfaceVariant} />
          </View>
        </TouchableRipple>
      </View>

      <DeModal isOpen={isOpen} onClose={onClose} hideHeader>
        <AdminDivisionSelector provinces={deliveryProvinces} onClose={onClose} />
      </DeModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  chip: {
    height: SIZE.locationChipHeight,
    borderRadius: RADIUS.full,
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    paddingHorizontal: SPACE.sm,
  },

  chipContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.xs,
  },

  chipText: {
    flex: 1,
  },
});

export default HeaderLocation;
