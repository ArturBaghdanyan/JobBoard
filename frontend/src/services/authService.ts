import { MOCK_API } from "../api/authApi";
import type { UserProfile } from "../types/auth";

export const authService = {
  getUsers: (): UserProfile[] =>
    JSON.parse(localStorage.getItem("users_db") || "[]"),

  saveUser: (user: UserProfile) => {
    const users = authService.getUsers();
    const existingIndex = users.findIndex((u) => u.email === user.email);

    if (existingIndex >= 0) {
      users[existingIndex] = { ...users[existingIndex], details: user.details };
    } else {
      users.push(user);
    }
    localStorage.setItem("users_db", JSON.stringify(users));
  },

  setSession: (user: UserProfile) => {
    localStorage.setItem(MOCK_API.TOKEN_KEY, MOCK_API.MOCK_JWT);
    localStorage.setItem("current_session_user", JSON.stringify(user));
  },

  getSessionUser: (): UserProfile | null => {
    const data = localStorage.getItem("current_session_user");
    return data ? JSON.parse(data) : null;
  },

  clearSession: () => {
    localStorage.removeItem(MOCK_API.TOKEN_KEY);
    localStorage.removeItem("current_session_user");
  },
};
