import { axiosClient } from 'config';

const ROUTE = '/auth';

export const authRegister = (): Promise<boolean> => axiosClient.post(`${ROUTE}/register`);
