import { LoginUserDto, TokenDto } from './dto';

export type StorageLoginType = {
  user: LoginUserDto;
  accessToken: TokenDto;
  refreshToken: TokenDto;
};

export type StorageType = StorageLoginType;
