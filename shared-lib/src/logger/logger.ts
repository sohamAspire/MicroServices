import winston from "winston";
import { ElasticsearchTransport } from 'winston-elasticsearch';

const logFormat = winston.format.combine(
    winston.format.colorize(), // Colorize logs in the console
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Add timestamp
    winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} ${level}: ${message}`; // Custom log message format
    })
);

// This could be done through env.
const isELKEnabled = false;
const INDEX = 'nodejs-logs'
const URL = 'http://localhost:9200'

const getTransports = () => {
    let transports: winston.transport[] = [
        new winston.transports.Console({
            format: logFormat
        }),
    ]

    // for ELK logging
    if (isELKEnabled) {
        transports.push(new ElasticsearchTransport({
            level: 'info',
            clientOpts: {
              node: URL,
            },
            indexPrefix: INDEX,
          }))
    }
    
    // for Local file logging
    if (!isELKEnabled) {
        transports.push(new winston.transports.File({
            filename: 'logs/app.log',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        }))
    }

    return transports
}

// Create the logger instance
const logger = () => winston.createLogger({
    level: 'info', 
    transports: getTransports()
});

export default logger;