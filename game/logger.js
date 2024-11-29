const fs = require('fs');
const path = require('path');

/**
 * Creates a Logger that writes logs to a file.
 */
class Logger {
    constructor() {
        // Ensure the logs directory exists
        const logsDir = path.join(__dirname, 'logs');
        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir, { recursive: true });
        }

        // Create a new log file with a timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        this.logFilePath = path.join(logsDir, `${timestamp}.log`);
        this.stream = fs.createWriteStream(this.logFilePath, { flags: 'a' });
    }

    /**
     * Writes a message to the log file and the console.
     * @param {string} level - The log level (e.g., 'LOG', 'INFO').
     * @param {...any} messages - The messages to log.
     */
    writeLog(level, ...messages) {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] [${level}] ${messages.map(String).join(' ')}`;

        // Write to the log file
        this.stream.write(logMessage + '\n');

        // Also output to the console
        //console[level.toLowerCase()]?.(logMessage);
    }

    log(...messages) {
        this.writeLog('LOG', ...messages);
    }

    info(...messages) {
        this.writeLog('INFO', ...messages);
    }

    warn(...messages) {
        this.writeLog('WARN', ...messages);
    }

    error(...messages) {
        this.writeLog('ERROR', ...messages);
    }

    /**
     * Closes the log file stream.
     */
    close() {
        this.stream.end();
    }
}

module.exports = { Logger };


