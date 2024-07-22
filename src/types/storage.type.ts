import { GetGlobalConfigDto, LoginUserDto, TokenDto } from './dto';

// update LOGIN when update type
export type StorageLoginType = {
  user: LoginUserDto;
  accessToken: TokenDto;
  refreshToken: TokenDto;
};

export type StorageOtherType = {
  globalConfig: GetGlobalConfigDto;
};

export type StorageType = Partial<StorageLoginType & StorageOtherType>;

const LOGIN: (keyof StorageLoginType)[] = ['user', 'accessToken', 'refreshToken'];

export const STORAGE_KEYS = {
  LOGIN,
};
