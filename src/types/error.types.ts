// types/error.types.ts

export interface RTKQueryError {
  status: number;
  data: {
    message?: string;
    error?: string;
    [key: string]: any;
  };
}

export interface AxiosErrorShape {
  message: string;
  response?: {
    data?: {
      message?: string;
      [key: string]: any;
    };
    status?: number;
  };
}

export interface ZodErrorShape {
  data: {
    error?: string;
    errors?: Record<string, string>;
  };
}
