import { useMemo, useState } from 'react';
import { View } from 'react-native';
import { DeAppBar } from 'components';
import { AdminDivisionDto, SelectedAdminDivision, SelectedLocation } from 'types';
import AdminDivisionList from './AdminDivisionList';

type Step = 'province' | 'district' | 'ward';

type Props = {
  provinces: AdminDivisionDto[];
  onClose: () => void;
};

const AdminDivisionSelector = ({ provinces, onClose }: Props) => {
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation>({
    ward: null,
    district: null,
    province: null,
  });
  const [step, setStep] = useState<Step>(getDefaultStep(selectedLocation));
  const [curDisplayAdminDivisions, setCurDisplayAdminDivisions] = useState<AdminDivisionDto[]>(provinces);

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

    setSelectedLocation({ ...selectedLocation, [step]: parseAdminDiv });
    setCurDisplayAdminDivisions(adminDiv.childDivisions || []);

    if (step === 'province') {
      setStep('district');
    } else if (step === 'district') {
      setStep('ward');
    }
  };

  const handlePressBack = () => {
    setSelectedLocation({ ward: null, district: null, province: null });
    onClose();
  };

  return (
    <View>
      <DeAppBar
        title={modalTitle}
        primaryText="Save"
        onPressSecondary={handlePressBack}
        onPressPrimary={() => null}
        rightButtonProps={{ disabled: step !== 'ward' }}
      />

      <AdminDivisionList adminDivisions={curDisplayAdminDivisions} onSelectAdminDivision={onSelectAdminDivision} />
    </View>
  );
};

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
