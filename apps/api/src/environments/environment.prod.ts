export const environment = {
  production: true,
  server: {
    host: 'https://ymrlk-code-blog.herokuapp.com',
    port: process.env.PORT,
    hostname: '0.0.0.0',
    globalPrefix: 'api',
    cors: { origin: 'https://ymrlk-code-blog.herokuapp.com' }
  }
};
