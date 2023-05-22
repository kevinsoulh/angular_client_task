export interface UserClaim {
  type: string;
  value: string;
}

export interface Response {
  isSuccess: boolean;
  message: string;
}

export const BASE_URL = 'http://localhost:5287/';
