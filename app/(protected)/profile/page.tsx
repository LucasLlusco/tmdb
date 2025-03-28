"use client"
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/context/AuthContextProvider';
import { logout } from '@/lib/actions/auth.actions'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useAuthContext();
  const route = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
      route.push("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className='container'>
      <h2 className="section-title text-center">Profile</h2>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Created at: {user?.$createdAt}</p>
      <Button variant={'destructive'} onClick={handleLogout} disabled={loading}>Logout</Button>
    </main>
  )
}

export default Profile