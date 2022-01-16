export interface ConfigurationInterface {
  YMRLK_MONGODB_CONNECTION_STRING: string;
  YMRLK_MONGODB_DATABASE_NAME: string;
  YMRLK_MONGODB_RETRY_ATTEMPTS: string;
  YMRLK_MONGODB_RETRY_DELAY: string;
  YMRLK_MONGODB_USER: string;
  YMRLK_MONGODB_PASSWORD: string;
  YMRLK_THROTTLE_TTL: string;
  YMRLK_THROTTLE_LIMIT: string;
  YMRLK_JWT_SECRET: string;
  YMRLK_JWT_EXPIRES_IN: string;
  YMRLK_REFRESH_TOKEN_EXPIRATION_DAYS: string;
  YMRLK_REFRESH_TOKEN_SIZE: string;
}

export const configuration: ConfigurationInterface = {
  YMRLK_MONGODB_CONNECTION_STRING:      'YMRLK_MONGODB_CONNECTION_STRING',
  YMRLK_MONGODB_DATABASE_NAME:           'YMRLK_MONGODB_DATABASE_NAME',
  YMRLK_MONGODB_RETRY_ATTEMPTS:         'YMRLK_MONGODB_RETRY_ATTEMPTS',
  YMRLK_MONGODB_RETRY_DELAY:            'YMRLK_MONGODB_RETRY_DELAY',
  YMRLK_MONGODB_USER:                   'YMRLK_MONGODB_USER',
  YMRLK_MONGODB_PASSWORD:               'YMRLK_MONGODB_PASSWORD',
  YMRLK_THROTTLE_TTL:                   'YMRLK_THROTTLE_TTL',
  YMRLK_THROTTLE_LIMIT:                 'YMRLK_THROTTLE_LIMIT',
  YMRLK_JWT_SECRET:                     'YMRLK_JWT_SECRET',
  YMRLK_JWT_EXPIRES_IN:                 'YMRLK_JWT_EXPIRES_IN',
  YMRLK_REFRESH_TOKEN_SIZE:             'YMRLK_REFRESH_TOKEN_SIZE',
  YMRLK_REFRESH_TOKEN_EXPIRATION_DAYS:  'YMRLK_REFRESH_TOKEN_EXPIRATION_DAYS'
};
