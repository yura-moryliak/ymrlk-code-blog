export const environment = {
  production: false,
  server: {
    host: 'http://localhost:3000',
    port: 3000,
    hostname: '0.0.0.0',
    globalPrefix: 'api',
    cors: { origin: 'http://localhost:4200' }
  }
};
