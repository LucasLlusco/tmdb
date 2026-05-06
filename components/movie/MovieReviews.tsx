"use client"
import { getReviewsByMedia } from '@/lib/actions/user.actions';
import Link from 'next/link';
import React from 'react'
import ReviewCard from '../shared/ReviewCard';
import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '@/lib/providers/AuthContextProvider';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

interface MovieReviewsProps {
  movieId: number;
}

const MovieReviews = ({movieId}: MovieReviewsProps) => {
  const { user, isLoading } = useAuthContext();
  const pathname = usePathname();

  const { data: reviews, isPending, isError } = useQuery({
    queryKey: ["reviews-media", movieId],
    queryFn: () => getReviewsByMedia(movieId, user?.userId || null),
    enabled: !isLoading
  });

  if (isPending) return <p>Loading reviews...</p>;
  if (isError) return <p>Error loading reviews</p>;

  return (
    <section className="container !px-0">
      <div className="flex mb-6 gap-2">
        <h3 className='section-title !mb-0'>User Reviews</h3>
        <Link href={`${pathname}/reviews`} className='flex items-center'>{reviews.length}<ChevronRight /></Link>
      </div>
      <article className='grid grid-cols-2 gap-[10px]'>
        {reviews.length > 0 ? (
          <>
          {reviews.slice(0, 2).map((review) => 
            <ReviewCard 
              key={review.$id}
              review={review} 
              currentUserId={user?.userId!} 
              isOwner={user?.userId === review.userId}
              queryKey={["reviews-media", review.mediaId]}
              showUser={true} 
              showPreviewContent={true} 
            />
          )}
          </>
        ) : (
          <p>No reviews have been created yet</p>
        )}        
      </article>
    </section>
  )
}

export default MovieReviews