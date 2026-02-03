"use client"
import { requestPasswordResetSchema } from '@/lib/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { requestPasswordReset } from '@/lib/actions/auth.actions';
import { ChevronLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const RequestPasswordResetForm = () => {
  const formSchema = requestPasswordResetSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ""
    }
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (email:string) => requestPasswordReset(email),
    onSuccess: () => {
      toast.success("Password reset link sent. Check your email");
    },
    onError: (error) => {
      toast.error("Failed to send reset link", {
        description: error.message
      })
    }
  });

  const onSubmit = async (data:z.infer<typeof formSchema>) => {
    mutate(data.email);
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
          disabled={isPending}
          className='font-bold disabled:cursor-not-allowed' 
        >
          Send
        </Button>
      </form> 
    </Form>
  )
}

export default RequestPasswordResetForm