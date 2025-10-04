"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '../ui/form';
import AuthFormField from './AuthFormField';
import { Button } from '../ui/button';
import Link from 'next/link';
import { login, signup } from '@/lib/actions/auth.actions';
import { useAuthContext } from '@/lib/providers/AuthContextProvider';
import { useRouter } from 'next/navigation';
import { authFormSchema } from '@/lib/schemas';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

interface AuthFormProps {
  type: 'sign-in' | 'sign-up'
}

interface AuthPayload {
  email: string
  password: string
  username?: string
}

const AuthForm = ({type}: AuthFormProps) => {
  const { setUser } = useAuthContext();
  const route = useRouter();
  
  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const { mutate, isPending } = useMutation({
    mutationFn: ({email, password, username}: AuthPayload) => type === "sign-in" ? login(email, password) : signup(email, password, username!),
    onSuccess: (data) => {
      setUser(data);
      toast.success(type === "sign-in" ? `Welcome back ${data.username}!` : `Welcome ${data.username}!`);
      route.push(`/user/${data?.userId}`);
    },
    onError: (error) => {
      toast.error(type === "sign-in" ? "Login failed" : "Sign up failed", {
        description: error.message
      })
    }
  });  

  const onSubmit = async (data:z.infer<typeof formSchema>) => {
    if(type === 'sign-in') {
      mutate({
        email: data.email,
        password: data.password
      });
    }
    if(type === 'sign-up') {
      mutate({
        email: data.email,
        password: data.password,
        username: data.username
      });
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
        {type === "sign-in" && (
          <Link href={"/forgot-password"} className='text-[#01b4e4e6] text-sm block text-start w-fit'>Forgot password?</Link>
        )}
        <div className="text-center my-5">
          <Button 
            type="submit" 
            className='font-bold disabled:cursor-not-allowed' 
            disabled={isPending}
          >
            {type === "sign-in" ? "Login" : "Sign up"}
          </Button>          
        </div>
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