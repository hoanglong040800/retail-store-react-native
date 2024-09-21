/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ENV } from 'const';
import { ErrorResponse, RefreshTokenBody, RefreshTokenDto, TokenDto } from 'types';
import { getSecureStoreItem, setSecureStoreItems } from 'utils';
import { publishEvent } from 'utils/event.util';

const axiosClient = axios.create({
  baseURL: ENV.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Functions ---

export const refreshAccessToken = async (): Promise<void> => {
  try {
    const accessToken: TokenDto = await getSecureStoreItem('accessToken');

    if (!accessToken?.token) {
      return;
    }

    const body: RefreshTokenBody = {
      accessToken,
    };

    const fullUrl = `${ENV.API_URL}/auth/refresh-token`;

    // can't use axiosClient because it will check for token again -> endless loop
    const res = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data: RefreshTokenDto = await res?.json();

    if (!data) {
      return;
    }

    await setSecureStoreItems({ accessToken: data.accessToken });
  } catch (error) {
    throw new Error(error);
  }
};

export const checkAccessTokenNeedRefresh = async (): Promise<boolean> => {
  const accessToken: TokenDto = await getSecureStoreItem('accessToken');

  if (!accessToken) {
    return false;
  }

  if (accessToken.token && !accessToken.expireAt) {
    return true;
  }

  const expireDuration = 5 * 60 * 1000; // 5 mins
  const now = new Date().getTime();
  const canRefreshDateTime = new Date(accessToken.expireAt).getTime() - expireDuration;

  // TODO resolve mismatch timezone
  if (canRefreshDateTime < now) {
    return true;
  }

  return false;
};

export const checkRefreshTokenValid = async (): Promise<boolean> => {
  const refreshToken: TokenDto = await getSecureStoreItem('refreshToken');

  if (!refreshToken || !refreshToken.token || !refreshToken.expireAt) {
    return false;
  }

  const now = new Date().getTime();
  const refreshExpireTime = new Date(refreshToken.expireAt).getTime();

  if (now < refreshExpireTime) {
    return true;
  }

  return false;
};

export const validateAccessToken = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
  try {
    const isAccessNeedRefresh = await checkAccessTokenNeedRefresh();
    const isRefreshTokenValid = await checkRefreshTokenValid();

    if (isAccessNeedRefresh && isRefreshTokenValid) {
      await refreshAccessToken();
    }

    return config;
  } catch (error) {
    throw new Error(error);
  }
};

const insertAuthToken = async (config: InternalAxiosRequestConfig) => {
  const accessToken: TokenDto = await getSecureStoreItem('accessToken');
  const newConfig = config;

  if (accessToken?.token) {
    newConfig.headers.Authorization = `Bearer ${accessToken.token}`;
  }

  return newConfig;
};

const parseResponse = (response: AxiosResponse<any, any>) => response.data;

const handleResponseError = (err: any): ErrorResponse => {
  if (err?.response?.data) {
    publishEvent('show snackbar error', err.response?.data);

    return err.response.data;
  }

  const defErrRes: ErrorResponse = {
    errorCode: 'SERVER_DOWN',
    status: 503,
    message: 'Server Down',
  };

  publishEvent('show snackbar error', defErrRes);
  return defErrRes;
};

axiosClient.interceptors.request.use(insertAuthToken);
axiosClient.interceptors.request.use(validateAccessToken);
axiosClient.interceptors.response.use(parseResponse, handleResponseError);

export default axiosClient;
