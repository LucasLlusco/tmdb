"use client"
import { Button } from '@/components/ui/button'
import { toggleReaction } from '@/lib/actions/user.actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner';

interface ReactReviewFormProps {
  review: ReviewDocument;
  currentUserId: string;
  isOwner: boolean;
  queryKey: unknown[]; //queryKey to invalidate user and media reviews
}

const ReactReviewForm = ({review, currentUserId, isOwner, queryKey} : ReactReviewFormProps) => {

  const queryClient = useQueryClient();
  
  const { mutate, isPending } = useMutation({
    mutationFn: (type: "like" | "dislike") => toggleReaction(currentUserId, review.$id, type),
    onMutate: async (type) => { //OPTIMISTIC UPDATE
      await queryClient.cancelQueries({ queryKey: queryKey });

      const previous = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old: ReviewWithUser[]) =>
        old.map((r) => {
          if (r.$id !== review.$id) return r;

          const wasLiked = r.currentUserReaction === type;
          return {
            ...r,
            currentUserReaction: wasLiked ? null : type,
            likesCount: type === "like"
              ? r.likesCount + (wasLiked ? -1 : 1)
              : r.likesCount - (r.currentUserReaction === "like" ? 1 : 0),
            dislikesCount: type === "dislike"
              ? r.dislikesCount + (wasLiked ? -1 : 1)
              : r.dislikesCount - (r.currentUserReaction === "dislike" ? 1 : 0),
          };
        })
      );

      return { previous };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: queryKey});
    },
    onError: (_, __, context) => {
      toast.error("Could not update your reaction. Please try again");
      queryClient.setQueryData(queryKey, context?.previous);
    },
  })

  const handleReaction = (type: "like" | "dislike") => {
    mutate(type);
  }

  return (
      <div className="flex gap-2 mt-3">
        <div className='flex items-center'>
          <Button 
            className={`rounded-full bg-transparent border-transparent ${review.currentUserReaction === "like" && "text-[#01b4e4e6]"}`} 
            size={'icon'} 
            variant={'outline'} 
            disabled={isOwner || isPending || !currentUserId}
            onClick={() => handleReaction("like")}
            >
            <ThumbsUp />
          </Button>
          <span className='text-sm'>{review.likesCount}</span>
        </div>
        <div className='flex items-center'>
          <Button 
            className={`rounded-full bg-transparent border-transparent ${review.currentUserReaction === "dislike" && "text-red-500"}`} 
            size={'icon'} 
            variant={'outline'} 
            disabled={isOwner || isPending || !currentUserId}
            onClick={() => handleReaction("dislike")}
            >
            <ThumbsDown />
          </Button>
          <span className='text-sm'>{review.dislikesCount}</span>
        </div>
      </div>
  )
}

export default ReactReviewForm