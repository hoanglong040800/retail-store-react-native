/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ENV } from 'const';
import { TokenDto } from 'types';
import { getStorageItem } from 'utils';

const axiosClient = axios.create({
  baseURL: ENV.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const insertAuthToken = async (config: InternalAxiosRequestConfig) => {
  const accessToken: TokenDto = await getStorageItem('accessToken');

  const newConfig = config;

  if (accessToken.token) {
    newConfig.headers.Authorization = `Bearer ${accessToken.token}`;
  }

  return newConfig;
};

const parseResponse = (response: AxiosResponse<any, any>) => response.data;

const handleResponseError = (err: any) => {
  if (err?.response?.data) return err.response.data;

  return {
    errorCode: 'SERVER_DOWN',
    status: 503,
    message: 'Server Down',
  };
};

axiosClient.interceptors.request.use(insertAuthToken);
axiosClient.interceptors.response.use(parseResponse, handleResponseError);

export default axiosClient;
