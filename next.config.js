module.exports = {
  async redirects() {
    return [
      {
        source: "/search",
        destination: "/",
        permanent: true,
      },
    ];
  },
};
