"use client";

import { useLogout } from "@/context/logout-context";
import { AuthScreen } from "@/features/auth/components/auth-screen";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LogoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggingOut, setIsLoggingOut } = useLogout();
  const { signOut } = useAuthActions();
  const router = useRouter();

  useEffect(() => {
    if (isLoggingOut) {
      signOut()
        .then(() => {
          router.replace("/auth"); 
        })
        .catch((error) => {
          console.error("Error during sign out:", error);
        })
        .finally(() => {
          setIsLoggingOut(false);
        });
    }
  }, [isLoggingOut, signOut, router, setIsLoggingOut]); 

  if (isLoggingOut) {
    return <AuthScreen />;
  }

  return <>{children}</>; 
};

export default LogoutWrapper;
