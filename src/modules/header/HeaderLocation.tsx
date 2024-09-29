import { DeModal } from 'components';
import { useModal } from 'hooks';
import { AdminDivisionSelector } from 'modules/admin-division';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useRecoilValue } from 'recoil';
import { globalConfigState } from 'states';
import { GetGlobalConfigDto } from 'types';

const HeaderLocation = () => {
  const { isOpen, onOpen, onClose } = useModal();
  const { deliveryProvinces } = useRecoilValue<GetGlobalConfigDto>(globalConfigState);

  return (
    <>
      <View style={styles.container}>
        <Button mode="contained" icon="map-marker" contentStyle={styles.btnContent} onPress={onOpen}>
          Choose store
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
