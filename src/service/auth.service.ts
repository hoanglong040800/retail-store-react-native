import { axiosClient } from 'config';
import { RegisterBody } from 'types/input';

const ROUTE = '/auth';

export const authRegister = (body: RegisterBody): Promise<boolean> => axiosClient.post(`${ROUTE}/register`, body);
