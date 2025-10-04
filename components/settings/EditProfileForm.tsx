"use client"
import Image from 'next/image';
import React from 'react'
import { Button } from '../ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { deleteUserAvatar, updateUserDocument } from '@/lib/actions/user.actions';
import { useAuthContext } from '@/lib/providers/AuthContextProvider';
import { editProfileFormSchema } from '@/lib/schemas';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';

const EditProfileForm = () => {
  const { user, setUser } = useAuthContext();

  const formSchema = editProfileFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: { 
      newUsername: user?.username || "",
      newBio: user?.bio || ""
    }
  })

  const fileRef = form.register("newAvatar");

  const { mutate, isPending } = useMutation({
    mutationFn: async (values:z.infer<typeof formSchema>) => {
      let newAvatarId, newAvatarPath;

      if(values.newAvatar) {
        const formData = new FormData();
        formData.append("file", values.newAvatar);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData
        })

        const result = await res.json();
        newAvatarId = result.avatarId;
        newAvatarPath = result.avatarPath;

        if(user?.avatarId) {
          await deleteUserAvatar(user.avatarId);
        }
      }

      const updatedUser = await updateUserDocument(user?.userId!, {
        ...(!!values.newAvatar) && {avatarId: newAvatarId},
        ...(!!values.newAvatar) && {avatarPath: newAvatarPath},
        ...(!!values.newUsername) && {username: values.newUsername},
        ...(!!values.newBio) && {bio: values.newBio}
      });
       
      return updatedUser;
    },
    onSuccess: (data) => {
      setUser(data);
      toast.success("Profile updated successfully");
    },
    onError: () => {
      toast.error("Could not update profile. Please try again");
    }
  });  

  const onSubmit = async (data:z.infer<typeof formSchema>) => {
    mutate(data);
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
              <FormLabel>Username</FormLabel>
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
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea 
                  {...field}
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

export default EditProfileForm