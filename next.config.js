module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/list/1',
        permanent: true,
      },
      {
        source: '/list/0',
        destination: '/list/1',
        permanent: true,
      },
    ]
  },
  images: {
    domains: ['raw.githubusercontent.com'],
  },
}