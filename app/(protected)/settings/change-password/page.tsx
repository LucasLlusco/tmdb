import ChangePasswordForm from '@/components/settings/ChangePasswordForm'
import React from 'react'

const ChangePasswordPage = () => {
  return (
    <main className='flex-1'>
      <h2 className='section-title'>Change Password</h2>
      <p className='mb-4 mt-2'>Set a new password to keep your account secure. Make sure it’s different from your previous one.</p>
      <ChangePasswordForm />
    </main>
  )
}

export default ChangePasswordPage