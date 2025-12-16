"use client"
import React from 'react'
import { updateListDocument } from '@/lib/actions/user.actions';
import { editListFormSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { EditIcon } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { useAuthContext } from '@/lib/providers/AuthContextProvider';

interface EditListFormProps {
  listId: string
  title: string
  isPublic: boolean
}

interface EditListPayload {
  title?: string
  isPublic?: boolean
}

const EditListForm = ({listId, title, isPublic} : EditListFormProps) => {
  const { user } = useAuthContext();

  const formSchema = editListFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      title: title,
      privacy: isPublic ? "public" : "private"
    }
  })  

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({title, isPublic} : EditListPayload) => updateListDocument(listId, {
      title: title,
      isPublic: isPublic
    }),
    onSuccess: () => {
      toast.success("List updated successfully");
      queryClient.invalidateQueries({queryKey: ["lists", user?.userId]});
    },
    onError: () => {
      toast.error("Could not update your list. Please try again");
    }
  });

  const onSubmit = async (data:z.infer<typeof formSchema>) => {
    mutate({
      title: data.title,
      isPublic: data.privacy === "public"? true : false
    });
  }  
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <EditIcon/>Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit List</DialogTitle>
          <DialogDescription>
            List your movie, TV picks.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
            <FormField
              control={form.control}
              name={"title"}
              render={({ field }) => (
                <FormItem className='text-left'>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"Enter the name of your list"} 
                      {...field} 
                      type={"text"} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className='text-sm'>Privacy setting</p>
            <Controller
              name='privacy'
              control={form.control}
              render={({field, fieldState}) => (
                <RadioGroup value={field.value} onValueChange={field.onChange} className='flex gap-5'>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="public" id="public" />
                    <Label htmlFor="public">Public</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="private" id="private" />
                    <Label htmlFor="private">Private</Label>
                  </div> 
                </RadioGroup>
              )}
            >
            </Controller>
            {form.getValues().privacy == "public" ? (
              <p className='text-sm'>Your list will be visible to everyone.</p>
            ) : (
              <p className='text-sm'>Others will not be able to view your list.</p>
            )}
            <div className='flex gap-2 justify-end'>
              <DialogClose asChild>
                <Button variant="outline" disabled={isPending}>Cancel</Button>
              </DialogClose>
              <Button type='submit' disabled={isPending}>Edit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default EditListForm