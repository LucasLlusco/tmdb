"use client"
import { updatePassword } from '@/lib/actions/auth.actions';
import { changePasswordFormSchema } from '@/lib/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

interface UpdatePasswordPayload {
  newPassword: string
  currentPassword: string
}

const ChangePasswordForm = () => {
  const formSchema = changePasswordFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    }
  })

  const { mutate, isPending } = useMutation({
    mutationFn: ({newPassword, currentPassword}: UpdatePasswordPayload) => updatePassword(newPassword, currentPassword),
    onSuccess: () => {
      toast.success("Password changed successfully");
      form.reset();
    },
    onError: (error) => {
      toast.error("Failed to change password", {
        description: error.message
      })
    }
  });

  const onSubmit = async (data:z.infer<typeof formSchema>) => {
    mutate({
      newPassword: data.newPassword,
      currentPassword: data.currentPassword
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
        <FormField
          control={form.control}
          name={"currentPassword"}
          render={({ field }) => (
            <FormItem className='text-left'>
              <FormLabel>Current password</FormLabel>
              <FormControl>
                <Input
                  placeholder={"Enter your current password to continue..."} 
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
          name={"newPassword"}
          render={({ field }) => (
            <FormItem className='text-left'>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input
                  placeholder={"New password"} 
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
          name={"confirmNewPassword"}
          render={({ field }) => (
            <FormItem className='text-left'>
              <FormLabel>Confirm new password</FormLabel>
              <FormControl>
                <Input
                  placeholder={"Confirm new password"} 
                  {...field}
                  type={"password"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={isPending}>Save</Button>
      </form>
    </Form>
  )
}

export default ChangePasswordForm