"use client"
import { useAuthContext } from '@/lib/providers/AuthContextProvider';
import { deleteAccountFormSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { deleteAccount } from '@/lib/actions/auth.actions';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

interface DeleteAccountPayload {
  email: string
  password: string
  avatarId?: string
}

const DeleteAccountForm = () => {
  const { user, setUser } = useAuthContext();
  const route = useRouter();
  
  const formSchema = deleteAccountFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const { mutate, isPending } = useMutation({
    mutationFn: ({email, password, avatarId}:DeleteAccountPayload) => deleteAccount(email, password, avatarId),
    onSuccess: () => {
      toast.success("Your account has been deleted");
      setUser(null);
      route.push("/");
    },
    onError: (error) => {
      toast.error("Failed to delete account. Please try again", {
        description: error.message
      });
    }
  });

  const onSubmit = async (data:z.infer<typeof formSchema>) => {
    mutate({ 
      email: data.email,
      password: data.password,
      avatarId: user?.avatarId
    });
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
        <Button type='submit' disabled={isPending} variant={"destructive"}>Delete</Button>
      </form> 
    </Form>
  )
}

export default DeleteAccountForm