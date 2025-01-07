/* eslint-disable camelcase */
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import { BottomButton, DeAppBar } from 'components';
import { selectedLocationSelector } from 'states';
import { BASE_STYLE } from 'const';
import { getFullDeliveryAddress, setStorageItems } from 'utils';
import { AdminDivisionDto, SelectedAdminDivision, SelectedLocation } from 'types';
import AdminDivisionList from './AdminDivisionList';

type Step = 'launch' | 'province' | 'district' | 'ward' | 'summary';

type Props = {
  provinces: AdminDivisionDto[];
  manualSaveLocation?: (location: SelectedLocation) => void;
  onClose: () => void;
};

const AdminDivisionSelector = ({ provinces, onClose, manualSaveLocation }: Props) => {
  const selectedLocationGS = useRecoilValue<SelectedLocation>(selectedLocationSelector);

  // ------ STATE ------
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation>({
    ward: null,
    district: null,
    province: null,
  });

  const [step, setStep] = useState<Step>(getDefaultStep(selectedLocationGS));

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
    switch (step) {
      case 'launch':
        return 'Delivery Location';

      case 'province':
        return 'Select Province';

      case 'district':
        return selectedLocation.province?.fullname;

      case 'ward':
        return selectedLocation.district?.fullname;

      case 'summary':
        return 'Summary';

      default:
        return '';
    }
  }, [step, selectedLocation]);

  // ------ FUNCTIONS ------

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

    switch (step) {
      case 'province':
        setStep('district');
        break;

      case 'district':
        setStep('ward');
        break;

      case 'ward':
        handleSaveLocation(newSelectedLocation);
        setStep('summary');
        break;

      default:
        break;
    }
  };

  const handleSaveLocation = async (selectedLocationPar: SelectedLocation): Promise<void> => {
    if (manualSaveLocation) {
      manualSaveLocation(selectedLocationPar);
      return;
    }

    await setStorageItems({ selectedLocation: selectedLocationPar });

    // trigger get new data from storage
    refreshSelectedLocationSelector();
  };

  const handlePressBack = () => {
    if (step === 'launch') {
      onClose();
    } else if (step === 'province') {
      setStep('launch');
    } else if (step === 'district') {
      setStep('province');
      setSelectedLocation({ ward: null, district: null, province: null });
    } else if (step === 'ward') {
      setStep('district');
      setSelectedLocation({ province: selectedLocation.province, district: null, ward: null });
    } else if (step === 'summary') {
      setStep('ward');
    }
  };

  const handlePressSelectAgain = () => {
    setStep('province');
  };

  const renderSummary = (selectedLocationPar: SelectedLocation) => {
    return (
      <View style={styles.summaryContainer}>
        <Text variant="titleLarge">
          You have selected branch at: {getFullDeliveryAddress(selectedLocationPar, 'full')}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <DeAppBar
        title={modalTitle}
        onPressSecondary={handlePressBack}
        rightButtonProps={{ disabled: step !== 'ward' }}
      />

      {['launch', 'summary'].includes(step) ? (
        renderSummary(selectedLocationGS)
      ) : (
        <AdminDivisionList
          adminDivisions={curDisplayAdminDivisions}
          onSelectAdminDivision={onSelectAdminDivision}
          style={styles.list}
        />
      )}

      {step === 'launch' && <BottomButton text="Select Again" onPress={handlePressSelectAgain} />}

      {step === 'summary' && <BottomButton text="Done" onPress={onClose} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...BASE_STYLE.CONTAINER_WRAP_BOT_BTN,
  },

  list: {
    padding: 16,
  },

  summaryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const getDefaultStep = (selectedLocationPar: SelectedLocation): Step => {
  if (!selectedLocationPar) {
    return 'province';
  }

  if (selectedLocationPar.province) {
    if (selectedLocationPar.district) {
      if (selectedLocationPar.ward) {
        return 'launch';
      }

      return 'ward';
    }

    return 'district';
  }

  return 'province';
};

export default AdminDivisionSelector;
