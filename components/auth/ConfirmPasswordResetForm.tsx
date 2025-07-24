"use client"
import { confirmPasswordResetSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { confirmPasswordReset } from '@/lib/actions/auth.actions';

interface PasswordResetFormProps {
  userId: string
  secret: string
}

const ConfirmPasswordResetForm = ({userId, secret}:PasswordResetFormProps) => {
  const [loading, setLoading] = useState(false);
  const formSchema = confirmPasswordResetSchema();
  const route = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  })

  const onSubmit = async (data:z.infer<typeof formSchema>) => {
    setLoading(true);
    try {      
      await confirmPasswordReset(userId!, secret!, data.password);
      route.push("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 container max-w-[700px] text-center">
        <h2 className='section-title'>Set a new password</h2>
        <p className='text-start'>Create a new password. Ensure it differs from previous one for security</p>
        <FormField
          control={form.control}
          name={"password"}
          render={({ field }) => (
            <FormItem className='text-left'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                   placeholder={"password"} 
                  {...field}
                  type={"password"} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"confirmPassword"}
          render={({ field }) => (
            <FormItem className='text-left'>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input
                  placeholder={"Confirm password"} 
                  {...field}
                  type={"password"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type='submit' 
          disabled={loading}
          className='font-bold disabled:cursor-not-allowed' 
        >
          Reset password
        </Button>
      </form> 
    </Form>
  )
}

export default ConfirmPasswordResetForm