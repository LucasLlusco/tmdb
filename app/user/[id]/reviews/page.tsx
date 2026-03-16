import UserReviewsContainer from '@/components/user/reviews/UserReviewsContainer';
import React from 'react'

interface ReviewsPageProps {
  params: {
    id: string;
  }
}

const ReviewsPage = async ({params} : ReviewsPageProps) => {
  const userId = params.id;
  
  return (
    <UserReviewsContainer userId={userId} />
  )
}

export default ReviewsPage