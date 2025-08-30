module.exports = {
  apps: [
    {
      name: 'gomanic-landing-br',
      script: 'node',
      args: '.next/standalone/server.js',
      cwd: '/home/zardes/gomanic-landing-br',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOSTNAME: '0.0.0.0',
        TZ: 'America/Sao_Paulo'
      },
      log_file: '/home/zardes/gomanic-landing-br/logs/combined.log',
      out_file: '/home/zardes/gomanic-landing-br/logs/out.log',
      error_file: '/home/zardes/gomanic-landing-br/logs/error.log',
      time: true
    }
  ]
};

