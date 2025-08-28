module.exports = {
  apps: [
    {
      name: 'gomanic-landing-br',
      script: 'npm',
      args: 'start',
      cwd: '/home/zardes/gomanic-landing-br',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: '/home/zardes/gomanic-landing-br/logs/err.log',
      out_file: '/home/zardes/gomanic-landing-br/logs/out.log',
      log_file: '/home/zardes/gomanic-landing-br/logs/combined.log',
      time: true
    }
  ]
};
