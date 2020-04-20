import config from "./constants/config";

export default {
  apiGateway: {
    REGION: config.API_GATEWAY_REGION,
    URL: config.API_GATEWAY_URL,
  },
  cognito: {
    REGION: config.COGNITO_REGION,
    USER_POOL_ID: config.USER_POOL_ID,
    APP_CLIENT_ID: config.APP_CLIENT_ID,
  },
};
