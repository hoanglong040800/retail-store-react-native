import { DeModal } from 'components';
import { useModal } from 'hooks';
import { AdminDivisionSelector } from 'modules/admin-division';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useRecoilValue } from 'recoil';
import { globalConfigState, selectedLocationSelector } from 'states';
import { GetGlobalConfigDto, SelectedLocation } from 'types';

const HeaderLocation = () => {
  const { isOpen, onOpen, onClose } = useModal();
  const { deliveryProvinces } = useRecoilValue<GetGlobalConfigDto>(globalConfigState);
  // GS shorthand for global state
  const selectedLocationGS = useRecoilValue<SelectedLocation>(selectedLocationSelector);

  const buttonText = useMemo(() => {
    const { province, district, ward } = selectedLocationGS || {};

    if (province && district && ward) {
      return `${ward.fullname}, ${district.fullname}, ${province.fullname}`;
    }

    return 'Choose store';
  }, [selectedLocationGS]);

  return (
    <>
      <View style={styles.container}>
        <Button mode="contained" icon="map-marker" contentStyle={styles.btnContent} onPress={onOpen}>
          {buttonText}
        </Button>
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
    justifyContent: 'flex-start',
  },
});

export default HeaderLocation;
