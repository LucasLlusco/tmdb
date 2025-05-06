"use client"
import Image from 'next/image';
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { updateUserDocument } from '@/lib/actions/user.actions';
import { useAuthContext } from '@/context/AuthContextProvider';
import { useRouter } from 'next/navigation';
import { editProfileFormSchema } from '@/lib/schemas';

const EditProfileForm = () => {
  const { user, setUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  const formSchema = editProfileFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newUsername: user?.username || "",
      newBio: user?.bio || ""
    }
  })

  const fileRef = form.register("newAvatar");

  const onSubmit = async (data:z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
       let avatarId, avatarPath;
      
       if(data.newAvatar) {
        const formData = new FormData();
        formData.append("file", data.newAvatar);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData
        })
        const result = await res.json();
        avatarId = result.avatarId;
        avatarPath = result.avatarPath;
       }

       const updatedUser = await updateUserDocument(user?.userId!, {
        ...(!!data.newAvatar) && {avatarId: avatarId},
        ...(!!data.newAvatar) && {avatarPath: avatarPath},
        ...(!!data.newUsername) && {username: data.newUsername},
        ...(!!data.newBio) && {bio: data.newBio}
       });

       setUser(updatedUser);
       route.push(`/user/${updatedUser?.userId}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }  

  const avatarUrl = `https://fra.cloud.appwrite.io/v1${user?.avatarPath}`;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
        <div className="flex gap-5 items-center">
          {user?.avatarPath ? (
            <Image
              src={avatarUrl}
              alt={user.username}
              width={125}
              height={125}
              className='rounded-full !h-[125px]'
            />
          ) : (
            <span className='bg-cyan-600 text-white flex items-center justify-center rounded-full text-[50px] min-w-[125px] h-[125px] uppercase font-bold'>
              {user?.username[0]}
            </span>
          )}
          <FormField
            control={form.control}
            name={"newAvatar"}
            render={({ field }) => (
              <FormItem className='text-left'>
                <FormLabel>Upload an avatar in png, jpg, jpeg, svg format</FormLabel>
                <FormControl>
                  <Input
                    {...fileRef} 
                    type={"file"} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name={"newUsername"}
          render={({ field }) => (
            <FormItem className='text-left'>
              <FormLabel>username</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  type={"text"} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"newBio"}
          render={({ field }) => (
            <FormItem className='text-left'>
              <FormLabel>bio</FormLabel>
              <FormControl>
                <Textarea 
                  {...field}
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

export default EditProfileForm