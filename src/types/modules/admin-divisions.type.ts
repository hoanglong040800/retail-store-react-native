export type SelectedAdminDivision = {
  id: string;
  fullname: string;
  name: string;
};

export type SelectedLocation = {
  province: SelectedAdminDivision;
  district: SelectedAdminDivision;
  ward: SelectedAdminDivision;
};
