// Logger utility for structured logging

export enum LogLevel {
  TRACE = 0,
  DEBUG = 1,
  INFO = 2,
  WARN = 3,
  ERROR = 4,
}

class Logger {
  private level: LogLevel = __DEV__ ? LogLevel.DEBUG : LogLevel.INFO;

  setLevel(level: LogLevel) {
    this.level = level;
  }

  trace(message: string, meta?: Record<string, unknown>) {
    if (this.level <= LogLevel.TRACE) {
      this.log('TRACE', message, meta);
    }
  }

  debug(message: string, meta?: Record<string, unknown>) {
    if (this.level <= LogLevel.DEBUG) {
      this.log('DEBUG', message, meta);
    }
  }

  info(message: string, meta?: Record<string, unknown>) {
    if (this.level <= LogLevel.INFO) {
      this.log('INFO', message, meta);
    }
  }

  warn(message: string, meta?: Record<string, unknown>) {
    if (this.level <= LogLevel.WARN) {
      this.log('WARN', message, meta);
    }
  }

  error(message: string, meta?: Record<string, unknown>) {
    if (this.level <= LogLevel.ERROR) {
      this.log('ERROR', message, meta);
    }
  }

  private log(level: string, message: string, meta?: Record<string, unknown>) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      ...meta,
    };

    // In development, use console
    if (__DEV__) {
      console.log(`[${timestamp}] ${level}: ${message}`, meta || '');
    } else {
      // In production, could send to logging service
      // For now, only log errors
      if (level === 'ERROR') {
        console.error(JSON.stringify(logEntry));
      }
    }
  }
}

export const logger = new Logger();
