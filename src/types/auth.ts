export interface UserProfile {
  username: string;
  email: string;
  password: string;
}

export interface UserDetails {
  username: string;
  city: string;
  address: string;
  birthday: string;
  telephone: string;
}

export interface MockApi {
  MOCK_JWT: string;
  TOKEN_KEY: string;
}