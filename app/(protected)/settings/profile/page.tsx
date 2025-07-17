import EditProfileForm from '@/components/settings/EditProfileForm'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const EditProfilePage = () => {
  return (
    <main className='flex-1'>
      <h2 className='section-title'>Edit Profile</h2>
      <div className="flex gap-2 mb-5">
        <Button asChild><Link href={"/settings/change-email"}>Change email</Link></Button>
        <Button asChild><Link href={"/settings/change-password"}>Change password</Link></Button>        
      </div>
      <EditProfileForm />
    </main>
  )
}

export default EditProfilePage