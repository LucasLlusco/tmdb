"use client"
import { authFormSchema } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '../ui/form';
import AuthFormField from './AuthFormField';
import { Button } from '../ui/button';
import Link from 'next/link';

interface AuthFormProps {
  type: 'sign-in' | 'sign-up'
}

const AuthForm = ({type}: AuthFormProps) => {
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = (values:z.infer<typeof formSchema>) => {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 container max-w-[700px] text-center">
        <h2 className='section-title'>
          {type === "sign-in" ? "Login" : "Sign up"}
        </h2>
        {type === "sign-up" && (
          <AuthFormField control={form.control} name="username" label="Username" placeholder="Enter your username" />
        )}
        <AuthFormField control={form.control} name="email" label="Email" placeholder="Enter your email" />
        <AuthFormField control={form.control} name="password" label="Password" placeholder="Enter your password" />
        <Button type="submit" className='my-5 w-full max-w-[100px] font-bold'>
          {type === "sign-in" ? "Login" : "Sign up"}
        </Button>
        <p className='text-sm'>
          {type === "sign-in" ? (
            <>Don't have an account yet? <Link href={"/signup"} className='text-[#01b4e4e6]'>Sign up</Link></>
          ) : (
            <>Already have an account? <Link href={"/login"} className='text-[#01b4e4e6]'>Login</Link></>
          )}
        </p>
      </form>
    </Form>    
  )
}

export default AuthForm