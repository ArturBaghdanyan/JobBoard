import type { UserProfile } from "./auth";

export type AuthContextType = {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: UserProfile) => Promise<boolean>;
  logout: () => void;
};
