import { axiosClient } from 'config';
import { LoginBody, LoginDto, RegisterBody, RegisterDto } from 'types';

const ROUTE = '/auth';

export const authRegister = (body: RegisterBody): Promise<RegisterDto> => axiosClient.post(`${ROUTE}/register`, body);

export const authLogin = (body: LoginBody): Promise<LoginDto> => axiosClient.post(`${ROUTE}/login`, body);
