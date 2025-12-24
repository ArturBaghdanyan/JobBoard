import { useState, useCallback } from "react";
import { MOCK_API } from "../api/authApi";
import { authService } from "../services/authService";
import type { UserProfile } from "../types/auth";

export const useAuth = () => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const token = localStorage.getItem(MOCK_API.TOKEN_KEY);
    if (token === MOCK_API.MOCK_JWT) {
      return authService.getSessionUser();
    }
    return null;
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const logout = useCallback(() => {
    authService.clearSession();
    setUser(null);
    setError(null);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    await new Promise((r) => setTimeout(r, 1000));

    const users = authService.getUsers();
    const found = users.find(
      (u) => u.email === email && u.password === password
    );

    if (found) {
      authService.setSession(found);
      setUser(found);
      setLoading(false);
      return true;
    } else {
      setError("Invalid email or password.");
      setLoading(false);
      return false;
    }
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
    setLoading(false);
    return true;
  }, []);

  return { user, loading, error, login, logout, register };
};
