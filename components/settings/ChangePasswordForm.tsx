"use client"
import { updatePassword } from '@/lib/actions/auth.actions';
import { ChangePasswordFormSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const ChangePasswordForm = () => {
  const [loading, setLoading] = useState(false);

  const formSchema = ChangePasswordFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    }
  })

  const onSubmit = async (data:z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const updateResult = await updatePassword(data.newPassword, data.currentPassword);
      form.reset();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
        <Button type='submit' disabled={loading}>Save</Button>
      </form>
    </Form>
  )
}

export default ChangePasswordForm