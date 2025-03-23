import { DeModal } from 'components';
import { THEME } from 'const';
import { useModal } from 'hooks';
import { AdminDivisionSelector } from 'modules/admin-division';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useRecoilValue } from 'recoil';
import { globalConfigState, selectedLocationSelector } from 'states';
import { GetGlobalConfigDto, SelectedLocation } from 'types';

// TODO remove this code
const HeaderLocation = () => {
  const { isOpen, onOpen, onClose } = useModal();
  const { deliveryProvinces } = useRecoilValue<GetGlobalConfigDto>(globalConfigState);
  // GS shorthand for global state
  const selectedLocationGS = useRecoilValue<SelectedLocation>(selectedLocationSelector);

  const isSelected = useMemo(() => {
    const { province, district, ward } = selectedLocationGS || {};

    return province && district && ward;
  }, [selectedLocationGS]);

  return (
    <>
      <View style={styles.container}>
        <IconButton
          mode="contained"
          icon={isSelected ? 'map-marker-check' : 'map-marker-outline'}
          iconColor="#fff"
          style={{ backgroundColor: isSelected ? THEME.colors.primary : 'transparent' }}
          onPress={onOpen}
        />
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

  btnContent: {
    backgroundColor: 'transparent',
  },
});

export default HeaderLocation;
