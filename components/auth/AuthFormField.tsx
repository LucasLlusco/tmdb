"use client"
import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Control, FieldPath } from 'react-hook-form';
import { z } from 'zod';
import { authFormSchema } from '@/lib/utils';

const formSchema = authFormSchema("sign-up");

interface AuthFormFieldProps {
  control: Control<z.infer<typeof formSchema>>,
  name: FieldPath<z.infer<typeof formSchema>>,
  label: string,
  placeholder: string,
  type: string
}

const AuthFormField = ({control, name, label, placeholder, type} : AuthFormFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='text-left'>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input 
              placeholder={placeholder} 
              {...field} 
              type={type} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />   
  )
}

export default AuthFormField