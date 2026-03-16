"use client"
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createReview } from '@/lib/actions/user.actions';
import { createReviewFormSchema } from '@/lib/schemas/user.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CrossIcon } from 'lucide-react';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface CreateReviewFormProps {
  userId: string;
  mediaId: number;
  mediaType: "movie" | "tv";
  mediaTitle: string;
  mediaPosterPath: string;
}

interface CreateReviewPayload {
  userId: string;
  title?: string;
  content: string;
}

const CreateReviewForm = ({userId, mediaId, mediaType, mediaTitle, mediaPosterPath} : CreateReviewFormProps) => {
  const formSchema = createReviewFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      title: "",
      content: ""
    }
  })  

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({userId, title, content} : CreateReviewPayload) => createReview({
      userId: userId, 
      mediaId: mediaId,
      mediaType: mediaType, 
      mediaTitle: mediaTitle,
      mediaPosterPath: mediaPosterPath,
      title: title,
      content: content
    }),
    onSuccess: () => {
      toast.success("Review created successfully");
      form.reset({
        title: "",
        content: ""
      });
      queryClient.invalidateQueries({queryKey: ["reviews-media", mediaId]});
      queryClient.invalidateQueries({queryKey: ["reviews-user", userId]});
    },
    onError: () => {
      toast.error("Could not create your review. Please try again");
    }
  });

  const onSubmit = async (data:z.infer<typeof formSchema>) => {
    mutate({
      userId: userId,
      title: data.title,
      content: data.content
    });
  } 

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <CrossIcon/> Write Review
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add user Review</DialogTitle>
          <DialogDescription>
            What did you think about <span className='font-bold'>{mediaTitle}</span>?            
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
                      placeholder={"Enter the title of your review"} 
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
              name={"content"}
              render={({ field }) => (
                <FormItem className='text-left'>
                  <FormLabel>Review</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Review"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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

export default CreateReviewForm