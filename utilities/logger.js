/** @format */

const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      silent: process.env.NODE_ENV === 'test',
    }),
    new winston.transports.File({
      level: 'error',
      filename: 'logs/error.log',
    }),
  ],
});

module.exports = logger;
