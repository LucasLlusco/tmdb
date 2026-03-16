"use client"
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { deleteReview } from '@/lib/actions/user.actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';

interface DeletetReviewFormProps {
  review: ReviewDocument;
}

const DeleteReviewForm = ({review} : DeletetReviewFormProps) => {
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

  const handleDelete = () => {
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
          <DialogDescription>
            <p>Are you sure you want to delete this review from <span className='font-bold'>{review.mediaTitle}</span> reviews?</p>
            <br />
            <p className='font-bold'>This action is irreversible.</p>
          </DialogDescription>
        </DialogHeader>
          <div className='flex gap-2 justify-end'>
            <DialogClose asChild>
              <Button variant="outline" disabled={isPending}>Cancel</Button>
            </DialogClose>
            <Button onClick={handleDelete} disabled={isPending}>Delete</Button>
          </div>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteReviewForm