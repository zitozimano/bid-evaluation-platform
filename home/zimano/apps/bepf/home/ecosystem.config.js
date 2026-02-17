module.exports = {
  apps: [
    {
      name: 'bepf-home',
      script: 'npm',
      args: 'run start',
      cwd: '/home/zimano/apps/bepf/home',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '512M',
      watch: false,
      out_file: '/var/log/pm2/bepf-home-out.log',
      error_file: '/var/log/pm2/bepf-home-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss'
    }
  ]
};
