/* eslint-disable camelcase */
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Surface, Text, TouchableRipple } from 'react-native-paper';
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import { BottomButton, DeAppBar } from 'components';
import { selectedLocationSelector } from 'states';
import { BASE_STYLE, RADIUS, SPACE } from 'const';
import { useAppTheme } from 'hooks';
import { getFullDeliveryAddress, setStorageItems } from 'utils';
import { AdminDivisionDto, SelectedAdminDivision, SelectedLocation } from 'types';
import AdminDivisionList from './AdminDivisionList';

type Step = 'launch' | 'province' | 'district' | 'ward' | 'summary';

type DivisionStep = 'province' | 'district' | 'ward';

const BREADCRUMB_STEPS: { step: DivisionStep; label: string }[] = [
  { step: 'province', label: 'Province' },
  { step: 'district', label: 'District' },
  { step: 'ward', label: 'Ward' },
];

const STORE_ICON_SIZE = 24;
const BREADCRUMB_ICON_SIZE = 16;

type Props = {
  provinces: AdminDivisionDto[];
  manualSaveLocation?: (location: SelectedLocation) => void;
  onClose: () => void;
};

const AdminDivisionSelector = ({ provinces, onClose, manualSaveLocation }: Props) => {
  const { colors } = useAppTheme();
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

  const handlePressBreadcrumb = (target: DivisionStep) => {
    if (target === 'province') {
      setStep('province');
      setSelectedLocation({ ward: null, district: null, province: null });
      return;
    }

    if (target === 'district') {
      setStep('district');
      setSelectedLocation({ province: selectedLocation.province, district: null, ward: null });
    }
  };

  const renderBreadcrumb = (currentStep: DivisionStep) => {
    const currentIndex = BREADCRUMB_STEPS.findIndex(item => item.step === currentStep);

    return (
      <View style={styles.breadcrumb}>
        {BREADCRUMB_STEPS.map((item, index) => {
          const isDone = index < currentIndex;
          const isCurrent = index === currentIndex;
          const color = (isDone && colors.primary) || (isCurrent && colors.onSurface) || colors.onSurfaceVariant;

          return (
            <View key={item.step} style={styles.breadcrumbItem}>
              {index > 0 && <Icon source="chevron-right" size={BREADCRUMB_ICON_SIZE} color={colors.onSurfaceVariant} />}

              <TouchableRipple disabled={!isDone} onPress={() => handlePressBreadcrumb(item.step)}>
                <View style={styles.breadcrumbItem}>
                  {isDone && <Icon source="check" size={BREADCRUMB_ICON_SIZE} color={color} />}
                  <Text variant={isCurrent ? 'labelLarge' : 'labelMedium'} style={{ color }}>
                    {item.label}
                  </Text>
                </View>
              </TouchableRipple>
            </View>
          );
        })}
      </View>
    );
  };

  const renderSummary = (selectedLocationPar: SelectedLocation) => {
    return (
      <View style={styles.summaryContainer}>
        <Surface elevation={1} style={styles.summaryCard}>
          <View style={[styles.storeIcon, { backgroundColor: colors.primaryContainer }]}>
            <Icon source="store-outline" size={STORE_ICON_SIZE} color={colors.onPrimaryContainer} />
          </View>

          <View style={styles.summaryText}>
            <Text variant="bodyMedium" style={{ color: colors.onSurfaceVariant }}>
              You have selected branch at:
            </Text>
            <Text variant="titleMedium">{getFullDeliveryAddress(selectedLocationPar, 'full')}</Text>
          </View>
        </Surface>
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
        <>
          {renderBreadcrumb(step as DivisionStep)}

          <AdminDivisionList
            key={step}
            adminDivisions={curDisplayAdminDivisions}
            onSelectAdminDivision={onSelectAdminDivision}
            contentContainerStyle={styles.list}
          />
        </>
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
    padding: SPACE.md,
  },

  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: SPACE.xxs,
    paddingHorizontal: SPACE.md,
    paddingBottom: SPACE.xs,
  },

  breadcrumbItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.xxs,
  },

  summaryContainer: {
    flex: 1,
    padding: SPACE.md,
  },

  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.sm,
    padding: SPACE.md,
    borderRadius: RADIUS.md,
  },

  storeIcon: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },

  summaryText: {
    flex: 1,
    gap: SPACE.xxs,
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
