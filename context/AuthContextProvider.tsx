"use client"
import { getLoggedInUser } from "@/lib/actions/auth.actions";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: AuthUserType | null
  setUser: (user: AuthUserType | null) => void
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<AuthUserType | null>(null);

  useEffect(() => {
    const handleGetLoggedInUser = async () => {
      try {
        const user = await getLoggedInUser();
        setUser(user);
      } catch (error) {
        console.log(error);
        setUser(null);
      }
    }
    handleGetLoggedInUser();
  }, [])
  
  return (
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)!;
  return context;
}