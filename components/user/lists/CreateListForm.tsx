"use client"
import React from 'react'
import { CrossIcon } from 'lucide-react'
import { createListFormSchema } from '@/lib/schemas'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createListDocument } from '@/lib/actions/user.actions'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

interface CreateListFormProps {
  userId: string
}

interface CreateListPayload {
  userId: string
  title: string
  isPublic: boolean
  description?: string
}

const CreateListForm = ({userId}: CreateListFormProps) => {
  const formSchema = createListFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      title: "",
      privacy: "public",
      description: ""
    }
  })  

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({userId, title, isPublic, description} : CreateListPayload) => createListDocument(userId, title, isPublic, description),
    onSuccess: () => {
      toast.success("List created successfully");
      form.reset({
        title: "",
        privacy: "public",
        description: ""
      });
      queryClient.invalidateQueries({queryKey: ["lists", userId]});
    },
    onError: () => {
      toast.error("Could not create your list. Please try again");
    }
  });

  const onSubmit = async (data:z.infer<typeof formSchema>) => {
    mutate({
      userId: userId,
      title: data.title,
      isPublic: data.privacy === "public" ? true : false, //createListDocument receives boolean. 
      description: data.description,
    });
  }    

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <CrossIcon/> Create a new list
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new List</DialogTitle>
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
            <FormField
              control={form.control}
              name={"description"}
              render={({ field }) => (
                <FormItem className='text-left'>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Describe your list"
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
              <Button type='submit' disabled={isPending}>Create</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateListForm