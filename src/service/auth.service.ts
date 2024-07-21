import { axiosClient } from 'config';
import { LoginDto, RegisterDto } from 'types';
import { LoginBody, RegisterBody } from 'types/input';

const ROUTE = '/auth';

export const authRegister = (body: RegisterBody): Promise<RegisterDto> => axiosClient.post(`${ROUTE}/register`, body);

export const authLogin = (body: LoginBody): Promise<LoginDto> => axiosClient.post(`${ROUTE}/login`, body);
