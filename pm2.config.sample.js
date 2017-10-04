module.exports = {
  apps: [
    {
      name: 'musicmashup',
      script: './bin/www',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        PORT: 3000,
        NODE_ENV: 'production',
        LAST_FM_KEY: '',
        LAST_FM_SECRET: '',
      },
    },
  ],
};
