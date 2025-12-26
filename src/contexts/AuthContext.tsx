// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { getMe } from "./getMe"; // your getMe function

export type Teacher = {
  id: number;
  name: string;
  email: string;
  role: "teacher";
};

export type Student = {
  id: number;
  name: string;
  grade: string;
  role: "student";
};

export type User = Teacher | Student;

interface AuthContextType {
  me: User | null;
  setMe: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
}



const AuthContext = createContext<AuthContextType | undefined>(undefined);

function isUser(data: any): data is User {
  if (!data || typeof data !== "object") return false;

  if (data.role === "teacher") {
    return (
      typeof data.id === "number" &&
      typeof data.name === "string" &&
      typeof data.email === "string"
    );
  }

  if (data.role === "student") {
    return (
      typeof data.id === "number" &&
      typeof data.name === "string" &&
      typeof data.grade === "string"
    );
  }

  return false;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [me, setMe] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe()
      .then((data) => {
        setMe(isUser(data) ? data : null);
      })
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