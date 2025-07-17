"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { updateEmail } from '@/lib/actions/auth.actions'
import { useAuthContext } from '@/context/AuthContextProvider'
import { ChangeEmailFormSchema } from '@/lib/schemas'

const ChangeEmailForm = () => {
  const [loading, setLoading] = useState(false);
  const {setUser} = useAuthContext();
  
  const formSchema = ChangeEmailFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      newEmail: "",
      confirmNewEmail: ""
    }
  })

  const onSubmit = async (data:z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const updatedUser = await updateEmail(data.newEmail, data.password);
      setUser(updatedUser);
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
          name={"password"}
          render={({ field }) => (
            <FormItem className='text-left'>
              <FormLabel>Password</FormLabel>
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
          name={"newEmail"}
          render={({ field }) => (
            <FormItem className='text-left'>
              <FormLabel>New email</FormLabel>
              <FormControl>
                <Input
                  placeholder={"New email"} 
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
          name={"confirmNewEmail"}
          render={({ field }) => (
            <FormItem className='text-left'>
              <FormLabel>Confirm new email</FormLabel>
              <FormControl>
                <Input
                  placeholder={"Confirm new email"} 
                  {...field}
                  type={"email"}
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

export default ChangeEmailForm