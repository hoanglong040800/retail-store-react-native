import { SelectedLocation } from 'types';

export const getFullDeliveryAddress = (location: SelectedLocation, type: 'short' | 'full'): string => {
  const { province, district, ward } = location || {};

  if (!province || !district || !ward) {
    return '';
  }

  switch (type) {
    case 'short':
      return `${ward.name}, ${district.name}, ${province.name}`;

    case 'full':
      return `${ward.fullname}, ${district.fullname}, ${province.fullname}`;

    default:
      return `${ward.fullname}, ${district.fullname}, ${province.fullname}`;
  }
};
