module.exports = {
  apps: [
    {
      name: 'bepf-internal',
      script: 'npm',
      args: 'run start',
      cwd: '/home/zimano/apps/bepf/apps/frontend-internal',
      env: {
        NODE_ENV: 'production',
        PORT: 3002
      },
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '512M',
      watch: false,
      out_file: '/var/log/pm2/bepf-internal-out.log',
      error_file: '/var/log/pm2/bepf-internal-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss'
    }
  ]
};
