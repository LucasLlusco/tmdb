"use client"
import { requestPasswordResetSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { requestPasswordReset } from '@/lib/actions/auth.actions';
import { ChevronLeftIcon } from 'lucide-react';
import Link from 'next/link';


const RequestPasswordResetForm = () => {
  const [loading, setLoading] = useState(false);
  const formSchema = requestPasswordResetSchema();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ""
    }
  })

  const onSubmit = async (data:z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      await requestPasswordReset(data.email!);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 container max-w-[700px] text-center">
        <Link href={"/login"} className='w-fit block'>
          <ChevronLeftIcon />
        </Link>
        <h2 className='section-title'>Forgot password</h2>
        <p className='text-start'>Enter your email and we’ll send you a link to reset your password.</p>
        <FormField
          control={form.control}
          name={"email"}
          render={({ field }) => (
            <FormItem className='text-left'>
              <FormLabel>Email</FormLabel>
              <FormControl>
                  <Input
                    placeholder={"Enter your email"}
                    {...field} 
                    type={"email"} 
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
          Send
        </Button>
      </form> 
    </Form>
  )
}

export default RequestPasswordResetForm