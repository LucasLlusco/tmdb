import DeleteAccountForm from '@/components/settings/DeleteAccountForm'
import { TriangleAlertIcon } from 'lucide-react'
import React from 'react'

const DeleteAccountPage = () => {
  return (
    <main className='flex-1'>
      <h2 className='section-title'>Delete Account</h2>
      <div className="flex gap-2 items-center">
        <TriangleAlertIcon />
        <p className='font-semibold text-sm'>Deleting your account is a permanent operation</p>
      </div>
      <p className='mb-4 mt-2'>This action cannot be undone. If you would like to continue and remove 
        your account, you can do so by entering your email and password below.
      </p>
      <DeleteAccountForm />
    </main>
  )
}

export default DeleteAccountPage