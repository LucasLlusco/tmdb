import ConfirmPasswordResetForm from '@/components/auth/ConfirmPasswordResetForm';
import React from 'react'

interface ResetPasswordPageProps {
  searchParams: {
    userId: string
    secret: string
  }
}

const ResetPasswordPage = ({searchParams}:ResetPasswordPageProps) => {
  return (
    <main>
      <ConfirmPasswordResetForm userId={searchParams.userId} secret={searchParams.secret} />
    </main>
  )
}

export default ResetPasswordPage