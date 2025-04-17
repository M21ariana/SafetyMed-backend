export interface BaseError {
    message: string;
    code?: string;
    stack?: string;
  }
  
  export interface DatabaseError extends BaseError {
    code: string;
    meta?: {
      target?: string[];
      cause?: string;
    };
  }
  
  export interface ValidationError extends BaseError {
    field?: string;
    value?: unknown;
  }
  
  export interface AuthenticationError extends BaseError {
    code: string;
    status?: number;
  }
  
  export type AppError = DatabaseError | ValidationError | AuthenticationError; 