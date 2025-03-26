import { axiosClient } from 'config';
import { GetSearchDto, GetSearchQuery } from 'types';

const ROUTE = '/search';

export const getSearchResult = (query: GetSearchQuery): Promise<GetSearchDto> =>
  axiosClient.get(`${ROUTE}`, { params: query });
