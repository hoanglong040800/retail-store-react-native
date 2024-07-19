import { axiosClient } from 'config';
import { RegisterDto } from 'types';
import { RegisterBody } from 'types/input';

const ROUTE = '/auth';

export const authRegister = (body: RegisterBody): Promise<RegisterDto> => axiosClient.post(`${ROUTE}/register`, body);
