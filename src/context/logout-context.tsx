"use client";
import { createContext, useContext, useState, ReactNode } from "react";

const LogoutContext = createContext<
  { isLoggingOut: boolean; setIsLoggingOut: (value: boolean) => void } | undefined
>(undefined);

export const LogoutProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  return (
    <LogoutContext.Provider value={{ isLoggingOut, setIsLoggingOut }}>
      {children}
    </LogoutContext.Provider>
  );
};

export const useLogout = () => {
  const context = useContext(LogoutContext);
  if (!context) {
    throw new Error("useLogout must be used within a LogoutProvider");
  }
  return context;
};
