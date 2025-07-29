import ChangeEmailForm from '@/components/settings/ChangeEmailForm'
import React from 'react'

const ChangeEmailPage = () => {
  return (
    <main className='flex-1'>
      <h2 className='section-title'>Change Email</h2>
      <p className='mb-4 mt-2'>Update the email address associated with your account. Make sure it’s one you actively use.</p>
      <ChangeEmailForm />
    </main>
  )
}

export default ChangeEmailPage