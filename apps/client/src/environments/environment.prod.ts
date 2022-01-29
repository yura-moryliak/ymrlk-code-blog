export const environment = {
  production: true,
  server: {
    baseUrl: 'https://ymrlk-code-blog.herokuapp.com/api'
  },
  tokens: {
    refresh: {
      domain: 'ymrlk-code-blog.herokuapp.com',
      path: '/',
      expiresIn: 2160000, // 25 days
      httpOnly: true
    }
  }
};
