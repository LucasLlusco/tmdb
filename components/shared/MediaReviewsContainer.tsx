"use client"
import React from 'react'
import ReviewCard from './ReviewCard'
import { useAuthContext } from '@/lib/providers/AuthContextProvider';
import { useQuery } from '@tanstack/react-query';
import { getReviewsByMedia } from '@/lib/actions/user.actions';
import CreateReviewForm from '../user/reviews/CreateReviewForm';

interface MediaReviewsContainerProps {
  mediaId: number;
  mediaType: "movie" | "tv";
  mediaTitle: string;
  mediaPosterPath: string;
}

const MediaReviewsContainer = ({mediaId, mediaType, mediaTitle, mediaPosterPath} : MediaReviewsContainerProps) => {
  const { user, isLoading } = useAuthContext();
  
  const { data: reviews, isPending, isError } = useQuery({
    queryKey: ["reviews-media", mediaId],
    queryFn: () => getReviewsByMedia(mediaId, user?.userId || null),
    enabled: !isLoading
  });

  if (isPending) return <p>Loading reviews...</p>;
  if (isError) return <p>Error loading reviews</p>;

  return (
    <section className='container'>
      <div className="flex justify-between items-center mb-6">
        <h3 className='section-title !mb-0'>User Reviews <span className='font-normal'>{reviews.length}</span></h3>
        {user && 
          <CreateReviewForm 
            userId={user.userId} 
            mediaId={mediaId} 
            mediaType={mediaType} 
            mediaTitle={mediaTitle} 
            mediaPosterPath={mediaPosterPath}
          />
        }
      </div>
      <article className='flex flex-col gap-5'>
        {reviews.length > 0 ? (
          <>
          {reviews.map((review) => 
            <ReviewCard
              key={review.$id}
              review={review}
              currentUserId={user?.userId!}
              isOwner={user?.userId === review.userId}
              queryKey={["reviews-media", review.mediaId]}
              showUser={true}
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

export default MediaReviewsContainer