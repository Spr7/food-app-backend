import { Logger, createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
const { prettyPrint, timestamp, errors, label } = format;

interface LoggerConfig {
  level: string;
  format: any; // You can refine this type
  transports: any[]; // You can refine this type
}

let logger: Logger | undefined;

if (process.env.NODE_ENV !== 'test') {
  logger = createLogger({
    level: 'error',
    format: format.combine(
      label({ label: 'bug', message: true }),
      timestamp(),
      errors({ stack: true }),
      prettyPrint(),
    ),
    transports: [
      new transports.Console(),
      new DailyRotateFile({
        level: 'error',
        filename: 'logs/error-%DATE%.log', // Date-based filename
        datePattern: 'YYYY-MM-DD', // Log file pattern
        zippedArchive: true, // Enable log file compression
        maxSize: '20m', // Maximum log file size before rotation
        maxFiles: '30d', // Keep log files for 30 days
      }),
    ],
  } as LoggerConfig); // Cast to LoggerConfig
}

export default logger;
