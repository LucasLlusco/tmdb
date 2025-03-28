"use client"
import { authFormSchema } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '../ui/form';
import AuthFormField from './AuthFormField';
import { Button } from '../ui/button';
import Link from 'next/link';
import { login, signup } from '@/lib/actions/auth.actions';
import { useAuthContext } from '@/context/AuthContextProvider';

interface AuthFormProps {
  type: 'sign-in' | 'sign-up'
}

const AuthForm = ({type}: AuthFormProps) => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthContext();
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = async (data:z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      if(type === 'sign-in') {
        const user = await login(data.email, data.password);
        setUser(user);
      }
      if(type === 'sign-up') {
        const user = await signup(data.email, data.password, data.username!);
        setUser(user);
      } 
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 container max-w-[700px] text-center">
        <h2 className='section-title'>
          {type === "sign-in" ? "Login" : "Sign up"}
        </h2>
        {type === "sign-up" && (
          <AuthFormField 
            control={form.control} 
            name="username" 
            label="Username" 
            placeholder="Enter your username" 
            type="name" 
          />
        )}
        <AuthFormField 
          control={form.control} 
          name="email" 
          label="Email" 
          placeholder="Enter your email" 
          type="email" 
        />
        <AuthFormField 
          control={form.control} 
          name="password" 
          label="Password" 
          placeholder="Enter your password" 
          type="password" 
        />
        <Button 
          type="submit" 
          className='my-5 w-full max-w-[100px] font-bold disabled:cursor-not-allowed' 
          disabled={loading}
        >
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