"use client"
import { getReviewsByUser } from '@/lib/actions/user.actions';
import { useAuthContext } from '@/lib/providers/AuthContextProvider';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import ReviewCard from '../../shared/ReviewCard';

interface UserReviewsContainerProps {
  userId: string;
}

const UserReviewsContainer = ({userId} : UserReviewsContainerProps) => {
  const { user, isLoading } = useAuthContext();

  const { data: reviews, isPending, isError } = useQuery({
    queryKey: ["reviews-user", userId],
    queryFn: () => getReviewsByUser(userId, user?.userId || null),
    enabled: !isLoading
  });

  if (isPending) return <p>Loading reviews...</p>;
  if (isError) return <p>Error loading reviews</p>;

  const isOwner = user?.userId === userId;

  return (
    <main>
      <section className='container'>
        <h3 className='section-title'>{isOwner ? "Your reviews" : "Reviews"}</h3>
        <article className='flex flex-col gap-5'>
          {reviews.length > 0 ? (
            <>
            {reviews.map((review) => (
              <ReviewCard 
                key={review.$id} 
                review={review} 
                currentUserId={user?.userId!} 
                isOwner={isOwner} 
                queryKey={["reviews-user", review.userId]}
                showUser={false}
              />
            ))}
            </>
          ) : (
            <p>{isOwner ? "You haven't created any reviews yet" : "No reviews have been created yet"}</p>
          )}
        </article>
      </section>
    </main>
  )
}

export default UserReviewsContainer