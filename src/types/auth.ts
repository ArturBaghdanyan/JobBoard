export interface UserProfile {
  username: string;
  email: string;
  password: string;
}

export interface MockApi {
  MOCK_JWT: string;
  TOKEN_KEY: string;
}