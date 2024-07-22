import { LoginUserDto, TokenDto } from './dto';

// update LOGIN when update type
export type StorageLoginType = {
  user: LoginUserDto;
  accessToken: TokenDto;
  refreshToken: TokenDto;
};

export type StorageType = StorageLoginType;

const LOGIN: (keyof StorageLoginType)[] = ['user', 'accessToken', 'refreshToken'];

export const STORAGE_KEYS = {
  LOGIN,
};
