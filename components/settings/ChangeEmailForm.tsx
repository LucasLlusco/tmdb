"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { updateEmail } from '@/lib/actions/auth.actions'
import { useAuthContext } from '@/lib/providers/AuthContextProvider'
import { changeEmailFormSchema } from '@/lib/schemas/auth.schema'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface UpdateEmailPayload {
  newEmail: string
  password: string
}

const ChangeEmailForm = () => {
  const route = useRouter();
  const { setUser } = useAuthContext();

  const formSchema = changeEmailFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      newEmail: "",
      confirmNewEmail: ""
    }
  })

  const { mutate, isPending } = useMutation({
    mutationFn: ({newEmail, password}: UpdateEmailPayload) => updateEmail(newEmail, password),
    onSuccess: (data) => {
      setUser(data); 
      toast.success("Email changed successfully");
      form.reset();
    },
    onError: (error) => {
      toast.error("Failed to update email", {
        description: error.message
      })
      if(error.message === "UNAUTHENTICATED") {
        route.replace("/login");
      }
    }
  });  

  const onSubmit = async (data:z.infer<typeof formSchema>) => {
    mutate({
      newEmail: data.newEmail,
      password: data.password
    });
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
        <Button type='submit' disabled={isPending}>Save</Button>
      </form>
    </Form>
  )
}

export default ChangeEmailForm