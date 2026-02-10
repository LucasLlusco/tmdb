"use client"
import { useAuthContext } from '@/lib/providers/AuthContextProvider';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const AuthLayout = ({children}: Readonly<{children:React.ReactNode}>) => {
  const { user, isLoading } = useAuthContext();
  const route = useRouter();

  useEffect(() => { 
    if(user && !isLoading) {
      route.replace(`/user/${user.userId}`);
    }
  }, [isLoading])

  if(isLoading) return null;

  return children;
}

export default AuthLayout