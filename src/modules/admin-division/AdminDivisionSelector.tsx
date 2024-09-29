import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRecoilRefresher_UNSTABLE } from 'recoil';
import { DeAppBar } from 'components';
import { selectedLocationSelector } from 'states';
import { setStorageItems } from 'utils';
import { AdminDivisionDto, SelectedAdminDivision, SelectedLocation } from 'types';
import AdminDivisionList from './AdminDivisionList';

type Step = 'province' | 'district' | 'ward';

type Props = {
  provinces: AdminDivisionDto[];
  manualSaveLocation?: (location: SelectedLocation) => void;
  onClose: () => void;
};

const AdminDivisionSelector = ({ provinces, onClose, manualSaveLocation }: Props) => {
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation>({
    ward: null,
    district: null,
    province: null,
  });
  const [step, setStep] = useState<Step>(getDefaultStep(selectedLocation));
  // eslint-disable-next-line camelcase
  const refreshSelectedLocationSelector = useRecoilRefresher_UNSTABLE(selectedLocationSelector);

  const curDisplayAdminDivisions = useMemo((): AdminDivisionDto[] => {
    if (selectedLocation.province) {
      const selectedProvinceIndex = provinces.findIndex(province => province.id === selectedLocation.province.id);

      if (selectedLocation.district) {
        const selectedDistrictIndex = provinces[selectedProvinceIndex]?.childDivisions.findIndex(
          district => district.id === selectedLocation.district.id
        );

        return provinces[selectedProvinceIndex].childDivisions[selectedDistrictIndex].childDivisions;
      }

      return provinces[selectedProvinceIndex].childDivisions;
    }

    return provinces;
  }, [provinces, selectedLocation]);

  const modalTitle = useMemo((): string => {
    if (selectedLocation?.district) {
      return selectedLocation.district.fullname;
    }

    if (selectedLocation?.province) {
      return selectedLocation.province.fullname;
    }

    return 'Select Province';
  }, [selectedLocation]);

  const onSelectAdminDivision = (adminDiv: AdminDivisionDto) => {
    const parseAdminDiv: SelectedAdminDivision = {
      id: adminDiv.id,
      fullname: adminDiv.fullname,
      name: adminDiv.name,
    };

    const newSelectedLocation: SelectedLocation = {
      ...selectedLocation,
      [step]: parseAdminDiv,
    };

    setSelectedLocation(newSelectedLocation);

    if (step === 'province') {
      return setStep('district');
    }

    if (step === 'district') {
      return setStep('ward');
    }

    return handleSaveLocation(newSelectedLocation);
  };

  const handleSaveLocation = async (selectedLocationPar: SelectedLocation): Promise<void> => {
    if (manualSaveLocation) {
      return manualSaveLocation(selectedLocationPar);
    }

    await setStorageItems({ selectedLocation: selectedLocationPar });

    // trigger get new data from storage
    refreshSelectedLocationSelector();
    return onClose();
  };

  const handlePressBack = () => {
    if (step === 'province') {
      onClose();
    } else if (step === 'district') {
      setStep('province');
      setSelectedLocation({ ward: null, district: null, province: null });
    } else if (step === 'ward') {
      setStep('district');
      setSelectedLocation({ province: selectedLocation.province, district: null, ward: null });
    }
  };

  return (
    <View>
      <DeAppBar
        title={modalTitle}
        onPressSecondary={handlePressBack}
        rightButtonProps={{ disabled: step !== 'ward' }}
      />

      <AdminDivisionList
        adminDivisions={curDisplayAdminDivisions}
        onSelectAdminDivision={onSelectAdminDivision}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
});

const getDefaultStep = (selectedLocationPar: SelectedLocation): Step => {
  if (!selectedLocationPar) {
    return 'province';
  }

  if (selectedLocationPar.province) {
    if (selectedLocationPar.district) {
      return 'ward';
    }

    return 'district';
  }

  return 'province';
};

export default AdminDivisionSelector;
