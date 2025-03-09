export const ENV = {
  API_URL: process.env.API_URL,

  STRIPE: {
    PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
  },

  TEST_MODE: {
    LOG_ASYNC_STORAGE: process.env.LOG_ASYNC_STORAGE,
  },
};
