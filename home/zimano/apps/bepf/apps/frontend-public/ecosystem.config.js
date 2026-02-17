module.exports = {
  apps: [
    {
      name: 'bepf-public',
      script: 'npm',
      args: 'run start',
      cwd: '/home/zimano/apps/bepf/apps/frontend-public',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '512M',
      watch: false,
      out_file: '/var/log/pm2/bepf-public-out.log',
      error_file: '/var/log/pm2/bepf-public-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss'
    }
  ]
};
