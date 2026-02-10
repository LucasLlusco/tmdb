"use client"
import { getLoggedInUser } from "@/lib/actions/auth.actions";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: UserType | null
  setUser: Dispatch<SetStateAction<UserType | null>>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const handleGetLoggedInUser = async () => {
      try {
        const user = await getLoggedInUser();
        setUser(user);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }
    handleGetLoggedInUser();
  }, [])
    
  return (
    <AuthContext.Provider value={{user, setUser, isLoading}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)!;
  return context;
}