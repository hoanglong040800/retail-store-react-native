import { GetGlobalConfigDto, LoginUserDto, TokenDto } from './dto';
import { SelectedLocation } from './modules';

// Combine with secure type since expo secure store doesn't work for web
export type StorageType = SecureStoreType & {
  user?: LoginUserDto;
  globalConfig?: GetGlobalConfigDto;
  selectedLocation?: SelectedLocation;
};

// ----------------- SECURE STORE -----------------

export type SecureStoreType = {
  accessToken?: TokenDto;
  refreshToken?: TokenDto;
};
