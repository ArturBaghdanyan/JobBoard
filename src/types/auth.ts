export interface UserProfile {
  username: string;
  email: string;
  password: string;
  details?: UserDetails;
}

export interface UserDetails {
  username: string;
  city: string;
  date: string;
  telephone: string;
}

export interface MockApi {
  MOCK_JWT: string;
  TOKEN_KEY: string;
}
