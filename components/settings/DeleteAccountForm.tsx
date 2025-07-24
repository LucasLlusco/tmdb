"use client"
import { useAuthContext } from '@/context/AuthContextProvider';
import { deleteAccountFormSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { deleteAccount } from '@/lib/actions/auth.actions';

const DeleteAccountForm = () => {
  const { user, setUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  
  const formSchema = deleteAccountFormSchema();
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
      const result = await deleteAccount(data.email, data.password, user?.avatarId);
      
      if(result?.success) {
        setUser(null);
        route.push("/");
      }
    } catch (error) {
      console.log("Error deleting account: ", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
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
        <FormField
          control={form.control}
          name={"password"}
          render={({ field }) => (
            <FormItem className='text-left'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder={"Enter your password"}
                  {...field} 
                  type={"password"} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={loading} variant={"destructive"}>Delete</Button>
      </form> 
    </Form>
  )
}

export default DeleteAccountForm