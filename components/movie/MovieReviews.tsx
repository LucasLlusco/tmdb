"use client"
import { getReviewsByMedia } from '@/lib/actions/user.actions';
import Link from 'next/link';
import React from 'react'
import ReviewCard from '../shared/ReviewCard';
import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '@/lib/providers/AuthContextProvider';
import { usePathname } from 'next/navigation';

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
    <section className='container'>
      <h3 className='section-title'>
        User Reviews
      </h3>
      <article className='grid grid-cols-2 gap-[10px]'>
        {reviews.length > 0 ? (
          <>
          {reviews.slice(0, 2).map((review) => 
            <ReviewCard 
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
      <p className="mt-6">
        <Link href={`${pathname}/reviews`} className='link-black'>
          View All Reviews
        </Link>
      </p>
    </section>
  )
}

export default MovieReviews