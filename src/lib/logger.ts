/**
 * Secure logging utility that prevents sensitive information leakage in production.
 * In development mode, full error details are logged for debugging.
 * In production, only sanitized messages are logged.
 */
export const logger = {
  error: (message: string, error?: unknown) => {
    if (import.meta.env.MODE === 'development') {
      console.error(message, error);
    } else {
      // In production, only log the sanitized message without error details
      console.error(message);
    }
  },
  
  warn: (message: string, data?: unknown) => {
    if (import.meta.env.MODE === 'development') {
      console.warn(message, data);
    } else {
      console.warn(message);
    }
  },
  
  info: (message: string, data?: unknown) => {
    if (import.meta.env.MODE === 'development') {
      console.log(message, data);
    }
    // In production, info logs are suppressed
  },
  
  debug: (message: string, data?: unknown) => {
    if (import.meta.env.MODE === 'development') {
      console.debug(message, data);
    }
    // Debug logs are only shown in development
  },
};
