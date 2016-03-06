'use strict';

const path = require('path');

const config = {

  // mongodb 配置
  db: 'mongodb://localhost/clean-blog',

  // redis 配置
  redis_host: '121.42.62.149',
  redis_port: 32769,
  redis_db: 0,
};

module.exports = config;
