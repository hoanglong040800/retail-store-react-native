/* eslint-disable camelcase */
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from 'recoil';
import { globalConfigState, selectedLocationSelector } from 'states';
import { AdminDivisionDto, ConfigAdminDivision, SelectedAdminDivision, SelectedLocation } from 'types';
import { setStorageItems } from 'utils';

export const useAddress = () => {
  const { deliveryProvinces } = useRecoilValue(globalConfigState);
  const refreshSelectedLocationSelector = useRecoilRefresher_UNSTABLE(selectedLocationSelector);

  const getSelectedLocationFromWardAdDiv = (wardAdminDivision: AdminDivisionDto): SelectedLocation => {
    if (!wardAdminDivision) {
      return null;
    }

    const ward: SelectedAdminDivision = {
      id: wardAdminDivision.id,
      fullname: wardAdminDivision.fullname,
      name: wardAdminDivision.name,
    };

    const district: AdminDivisionDto = wardAdminDivision.parentDivision;

    const province: AdminDivisionDto = district?.parentDivision;

    if (!province || !district || !ward) {
      return null;
    }

    const mappedSelectedLocation: SelectedLocation = {
      province: {
        id: province.id,
        fullname: province.fullname,
        name: province.name,
      },

      district: {
        id: district.id,
        fullname: district.fullname,
        name: district.name,
      },

      ward,
    };

    if (!validateAddress(mappedSelectedLocation)) {
      return null;
    }

    return mappedSelectedLocation;
  };

  const validateAddress = (selLocaPar: SelectedLocation): boolean => {
    if (!selLocaPar?.province || !selLocaPar?.district || !selLocaPar?.ward) {
      return false;
    }

    const configProvince: ConfigAdminDivision = deliveryProvinces.find(
      province => province.id === selLocaPar.province.id
    );

    if (!configProvince) {
      return false;
    }

    const configDistrict: ConfigAdminDivision = configProvince.childDivisions.find(
      district => district.id === selLocaPar.district.id
    );

    if (!configDistrict) {
      return false;
    }

    const configWard: ConfigAdminDivision = configDistrict.childDivisions.find(ward => ward.id === selLocaPar.ward.id);

    return !!configWard;
  };

  const setSelectedLocation = async (selectedLocationPar: SelectedLocation) => {
    if (!selectedLocationPar) {
      return;
    }

    await setStorageItems({ selectedLocation: selectedLocationPar });
    refreshSelectedLocationSelector();
  };

  const setLocationFromDeliveryWard = async (wardAdminDivision: AdminDivisionDto) => {
    if (!wardAdminDivision) {
      return;
    }

    const selectedLocation = getSelectedLocationFromWardAdDiv(wardAdminDivision);

    // need throw error because address is wrong, not empty
    if (!selectedLocation) {
      throw new Error('Cant get selected location');
    }

    await setSelectedLocation(selectedLocation);
  };

  return {
    setLocationFromDeliveryWard,
  };
};
