export const ENV = {
  API_URL: process.env.API_URL,

  OAUTH: {
    WEB: {
      CLIENT_ID: process.env.OAUTH_WEB_CLIENT_ID,
      CLIENT_SECRET: process.env.OAUTH_WEB_CLIENT_SECRET,
    },

    ANDROID: {
      CLIENT_ID: process.env.OAUTH_ANDROID_CLIENT_ID,
      CLIENT_SECRET: process.env.OAUTH_ANDROID_CLIENT_SECRET,
    },

    IOS: {
      CLIENT_ID: process.env.OAUTH_IOS_CLIENT_ID,
      CLIENT_SECRET: process.env.OAUTH_IOS_CLIENT_SECRET,
    },
  },
};
