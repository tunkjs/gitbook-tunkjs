const setting = {
    name: "www.tunkjs.com",
    script: "server.js",
    max_memory_restart : "300M",
    log_date_format: "YYYY-MM-DD HH:mm:ss.SSS",
    merge_logs : true,
    out_file: "log/app.log",
    error_file: "log/err.log",
    instances: 0,
    exec_mode: 'cluster'
  }

  module.exports = {
    apps: [setting]
  }