export type SelectedAdminDivision = {
  id: string;
  fullname: string;
  name: string;
};

export type SelectedLocation = {
  address?: string;
  province: SelectedAdminDivision;
  district: SelectedAdminDivision;
  ward: SelectedAdminDivision;
};
