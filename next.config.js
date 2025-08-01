module.exports = {
    reactStrictMode: true,
    webpack: (config, { isServer }) => {
      // Only for the client build
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false,
          path: false,
          crypto: false,
        };
      }
      return config;
    },
  };
  
  