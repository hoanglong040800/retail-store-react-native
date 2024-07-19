/* eslint-disable @typescript-eslint/no-explicit-any */

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ENV } from 'const';

const axiosClient = axios.create({
  baseURL: ENV.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const insertAuthToken = async (config: InternalAxiosRequestConfig) => {
  const token = await AsyncStorage.getItem('auth_token');
  const newConfig = config;

  if (token) {
    newConfig.headers.Authorization = `Bearer ${token}`;
  }

  return newConfig;
};

const parseResponse = (response: AxiosResponse<any, any>) => response.data;

// TODO render <Snackbar /> error whenever api throw error
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
