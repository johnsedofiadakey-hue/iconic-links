/**
 * Structured logging system for the application
 * Provides consistent logging across the codebase
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, any>;
  error?: Error;
}

class Logger {
  private isDev = process.env.NODE_ENV === 'development';

  private formatLog(entry: LogEntry): string {
    const { level, message, timestamp, context, error } = entry;
    const levelUpper = level.toUpperCase().padEnd(5);

    let log = `[${timestamp}] ${levelUpper} ${message}`;

    if (context && Object.keys(context).length > 0) {
      log += ` | ${JSON.stringify(context)}`;
    }

    if (error) {
      log += `\n${error.stack}`;
    }

    return log;
  }

  private log(level: LogLevel, message: string, context?: Record<string, any>, error?: Error) {
    const timestamp = new Date().toISOString();
    const entry: LogEntry = { level, message, timestamp, context, error };
    const formatted = this.formatLog(entry);

    switch (level) {
      case 'debug':
        if (this.isDev) console.log(formatted);
        break;
      case 'info':
        console.log(formatted);
        break;
      case 'warn':
        console.warn(formatted);
        break;
      case 'error':
        console.error(formatted);
        break;
    }
  }

  /**
   * Log debug message (only in development)
   */
  debug(message: string, context?: Record<string, any>) {
    this.log('debug', message, context);
  }

  /**
   * Log info message
   */
  info(message: string, context?: Record<string, any>) {
    this.log('info', message, context);
  }

  /**
   * Log warning message
   */
  warn(message: string, context?: Record<string, any>) {
    this.log('warn', message, context);
  }

  /**
   * Log error message
   */
  error(message: string, error?: Error, context?: Record<string, any>) {
    this.log('error', message, context, error);
  }
}

export const logger = new Logger();
