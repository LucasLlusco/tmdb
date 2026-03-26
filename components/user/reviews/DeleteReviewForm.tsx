"use client"
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { deleteReview } from '@/lib/actions/user.actions';
import { deleteReviewFormSchema } from '@/lib/schemas/user.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface DeletetReviewFormProps {
  review: ReviewDocument;
}

const DeleteReviewForm = ({review} : DeletetReviewFormProps) => {
  const formSchema = deleteReviewFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirm: false
    }
  })

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteReview(review.$id),
    onSuccess: () => {
      toast.success("Review deleted successfully");
      queryClient.invalidateQueries({queryKey: ["reviews-media", review.mediaId]});
      queryClient.invalidateQueries({queryKey: ["reviews-user", review.userId]}); 
    },
    onError: () => {
      toast.error("Could not delete your review. Please try again");
    }
  });

  const onSubmit = async (data:z.infer<typeof formSchema>) => {
    mutate();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="destructive">
          <Trash/>Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Review</DialogTitle>
          <DialogDescription className='space-y-3'>
            <p>Are you sure you want to delete this review from <span className='font-bold'>{review.mediaTitle}</span> reviews?</p>
            <p className='font-bold'>This action is irreversible.</p>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem className="text-left flex flex-row flex-wrap items-center">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className='!mt-0 ml-3'>I understand and confirm the action</FormLabel>   
                  <FormMessage className='w-full' />  
                </FormItem>
              )}
            />
            <div className='flex gap-2 justify-end'>
              <DialogClose asChild>
                <Button variant="outline" disabled={isPending}>Cancel</Button>
              </DialogClose>
              <Button type='submit' disabled={isPending || form.getValues("confirm") === false}>Delete</Button>
            </div>
          </form>
        </Form>                 
      </DialogContent>
    </Dialog>
  )
}

export default DeleteReviewForm