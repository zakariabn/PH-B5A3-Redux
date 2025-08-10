export interface IResponseData {
  success: boolean;
  message: string;
  error?: object;
}

// i will implement this letter
// export interface IResponseData<T = unknown> {
//   success: boolean;
//   message: string;
//   data?: T;
//   error?: object;
// }
