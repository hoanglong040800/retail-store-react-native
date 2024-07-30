import { axiosClient } from 'config';
import { UserDto } from 'types';

const ROUTE = '/users';

export const getAllUsers = (): Promise<UserDto[]> => axiosClient.get(ROUTE);
