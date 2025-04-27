import { axiosClient } from 'config';
import { GetHomeDataDto } from 'types/dto/home.dto';

const ROUTE = '/home';

export const getHomeData = (): Promise<GetHomeDataDto> => axiosClient.get(ROUTE);
