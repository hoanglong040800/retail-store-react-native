import { GetGlobalConfigDto, LoginUserDto, TokenDto } from './dto';

// Combine with secure type since expo secure store doesn't work for web
export type StorageType = SecureStoreType & {
  user?: LoginUserDto;
  globalConfig?: GetGlobalConfigDto;
};

// ----------------- SECURE STORE -----------------

export type SecureStoreType = {
  accessToken?: TokenDto;
  refreshToken?: TokenDto;
};
