import { format } from 'winston';
import winston from 'winston';

const consoleLogFormat = format.printf( ({ level, message, timestamp, exceptionType, ...metadata}) => {
    let msg = `${timestamp} [${level}] : ${exceptionType || ''} : ${message} `;
    if (metadata) {
        msg += JSON.stringify(metadata);
    }
    return msg;
});

const options = {
    errorLog: {
        level: 'error',
        filename: 'task-2/logs/error.log.txt',
        maxsize: 5242880, // 5MB
        maxFiles: 5,
    },
    debugLog: {
        level: 'debug',
        filename: 'task-2/logs/debug.log.txt',
        maxsize: 5242880, // 5MB
    },
    consoleLog: {
        level: 'debug',
        format: format.combine(
            winston.format.colorize(),
            format.timestamp(),
            format.errors({stack: true}),
            consoleLogFormat,
        ),
    }
};

const logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.errorLog),
        new winston.transports.File(options.debugLog),
        new winston.transports.Console(options.consoleLog),
    ],
    format: format.combine(
        format.timestamp(),
        format.errors({stack: true}),
        format.json(),
    ),
});

export { logger };
