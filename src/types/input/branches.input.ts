import { IBranch } from '../interface';

export class FindBranchesByFilterQuery implements IBranch {
  wardId?: string;
  districtId?: string;
  provinceId?: string;
  isActive?: boolean;
}
