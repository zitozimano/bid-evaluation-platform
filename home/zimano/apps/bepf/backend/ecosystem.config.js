module.exports = {
  apps: [
    {
      name: 'bepf-backend',
      script: 'node',
      args: 'dist/main.js',
      cwd: '/home/zimano/apps/bepf/backend',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '512M',
      watch: false,
      out_file: '/var/log/pm2/bepf-backend-out.log',
      error_file: '/var/log/pm2/bepf-backend-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss'
    }
  ]
};
