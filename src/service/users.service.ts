import { axiosClient } from 'config';
import { UserDto } from 'types';

const ROUTE = '/users';

export const getAllUsers = (): Promise<UserDto[]> => axiosClient.get(ROUTE);

export const getUserById = (userId: string): Promise<UserDto> => axiosClient.get(`${ROUTE}/${userId}`);
