import { axiosClient } from 'config';
import { BranchDto, FindBranchesByFilterQuery } from 'types';

const ROUTE = '/branches';

export const getBranchesByFitler = (query?: FindBranchesByFilterQuery): Promise<BranchDto[]> =>
  axiosClient.get(`${ROUTE}`, { data: query });
