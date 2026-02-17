"use client";

import { createContext, useContext } from "react";

interface User {
  id: string;
  role: string;
  name?: string;
}

interface AuthContextValue {
  user: User | null;
}

const AuthContext = createContext<AuthContextValue>({ user: null });

export function useAuth() {
  return useContext(AuthContext);
}

// You already have a provider in your app; ensure it sets user.role correctly.
