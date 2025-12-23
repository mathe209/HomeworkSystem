// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { getMe } from "./getMe"; // your getMe function

type Me = { id: number; name: string; email: string };

interface AuthContextType {
  me: Me | null;
  setMe: (me: Me | null) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe()
      .then(setMe)
      .catch(() => setMe(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ me, setMe, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};