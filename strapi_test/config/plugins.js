module.exports = ({ env }) => ({
    upload: {
      config: {
        provider: 'local',
        providerOptions: {
          sizeLimit: 10000000,
        },
      },
    },
    "netlify-deployments": {
      enabled: true,
      config: {
        accessToken: process.env.NETLIFY_DEPLOYMENTS_PLUGIN_ACCESS_TOKEN
      },
    },
  });