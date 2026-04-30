import {
  useState,
  useCallback,
} from "react";
import type {ReactNode} from "react"
import { MOCK_API } from "../api/authApi";
import { authService } from "../services/authService";
import type { UserProfile } from "../types/auth";
import { AuthContext } from "./AuthContext";


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const token = localStorage.getItem(MOCK_API.TOKEN_KEY);
    return token === MOCK_API.MOCK_JWT ? authService.getSessionUser() : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    await new Promise((r) => setTimeout(r, 1000));

    const users = authService.getUsers();
    const found = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) {
      setError("Invalid email or password.");
      setLoading(false);
      return false;
    }

    authService.setSession(found);
    setUser(found);
    setLoading(false);
    return true;
  }, []);

  const register = useCallback(async (data: UserProfile) => {
    setLoading(true);
    setError(null);

    await new Promise((r) => setTimeout(r, 1000));

    const users = authService.getUsers();
    if (users.some((u) => u.email === data.email)) {
      setError("User already exists.");
      setLoading(false);
      return false;
    }

    authService.saveUser(data);
    authService.setSession(data);
    setUser(data);
    setLoading(false);
    return true;
  }, []);

  const logout = useCallback(() => {
    authService.clearSession();
    setUser(null);
    setError(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

