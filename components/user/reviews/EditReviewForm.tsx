"use client"
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { updateReview } from '@/lib/actions/user.actions';
import { editReviewFormSchema } from '@/lib/schemas/user.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EditIcon } from 'lucide-react';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface EditReviewFormProps {
  review: ReviewDocument;
}

interface EditReviewPayload {
  title?: string;
  content: string;
}

const EditReviewForm = ({review} : EditReviewFormProps) => {
  const formSchema = editReviewFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      title: review.title,
      content: review.content
    }
  })  

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({title, content} : EditReviewPayload) => updateReview(review.$id, {
      title: title,
      content: content
    }),
    onSuccess: () => {
      toast.success("Review updated successfully");
      queryClient.invalidateQueries({queryKey: ["reviews-media", review.mediaId]});
      queryClient.invalidateQueries({queryKey: ["reviews-user", review.userId]});
    },
    onError: () => {
      toast.error("Could not update your review. Please try again");
    }
  });

  const onSubmit = async (data:z.infer<typeof formSchema>) => {
    mutate({
      title: data.title,
      content: data.content
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
          <DialogTitle>Edit Review</DialogTitle>
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
              <Button type='submit' disabled={isPending}>Edit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default EditReviewForm