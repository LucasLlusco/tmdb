import React from 'react'
import EditReviewForm from '../user/reviews/EditReviewForm';
import DeleteReviewForm from '../user/reviews/DeleteReviewForm';
import Link from 'next/link';
import { getFormattedDate } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ImageWithFallback from '@/components/shared/ImageWithFallback';
import { Separator } from '@/components/ui/separator';
import ReactReviewForm from '../user/reviews/ReactReviewForm';

type ReviewCardProps =
  | { 
    review: ReviewDocument; 
    currentUserId: string; 
    isOwner: boolean;
    queryKey: unknown[];
    showUser: false; 
    showPreviewContent?: boolean;
  }
  | { 
    review: ReviewWithUser; 
    currentUserId: string;
    isOwner: boolean; 
    queryKey: unknown[];
    showUser: true; 
    showPreviewContent?: boolean;
  }

const ReviewCard = ({review, currentUserId, isOwner, queryKey, showUser, showPreviewContent} : ReviewCardProps) => {

  const avatarPath = showUser ? review.user.avatarPath : "";
  const avatarUrl = `https://fra.cloud.appwrite.io/v1${avatarPath}`;
  const initial = showUser && review.user.username[0];

  const mediaPathname = `/${review.mediaType}/${review.mediaId}-${review.mediaTitle}`;

  return (
    <div className='flex flex-col card-boxshadow rounded-[5px] py-[5px] px-[10px]'>
      {!showUser && (
        <>
          <div className='flex flex-row items-center gap-[10px]'>
            <Link
              href={mediaPathname}
              className='rounded-t-[8px]'
            >
              <ImageWithFallback
                src={review.mediaPosterPath} 
                alt={review.mediaTitle} 
                className={'bg-[#dbdbdb] rounded-[5px] h-full w-full'}
                width={58}
                height={87}
              />            
            </Link>
            <Link href={mediaPathname} className='link-black font-bold w-fit'>
              {review.mediaTitle}
            </Link>
          </div>
          <Separator className='my-[10px]' />
          <span className='text-xs'>
            {getFormattedDate(review.$createdAt)}
          </span>         
        </>
      )}

      {showUser && (
        <div className="flex gap-2 items-center text-xs">
          {avatarPath ? (
            <Avatar className={"w-8 h-8"} >
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>{review.user.username}</AvatarFallback>
            </Avatar>
            ) : (
              <span className='bg-cyan-600 text-white flex items-center justify-center rounded-full w-8 h-8 uppercase font-bold'>
                {initial}
              </span>
            )}
          <span>Written by <Link href={`/user/${review.userId}`} className="text-[#01b4e4e6]">{review.user.username}</Link> on {getFormattedDate(review.$createdAt)}</span>
        </div>
      )}

      <h4 className='font-bold mt-[10px]'>{review.title}</h4>
      <p className={`${showPreviewContent && "overflow-txt"} mt-[10px] text-sm`}>{review.content}</p>
      <ReactReviewForm review={review} currentUserId={currentUserId} isOwner={isOwner} queryKey={queryKey}  />
      {isOwner && (
        <div className="flex gap-2 items-end mt-3">
          <EditReviewForm review={review} />
          <DeleteReviewForm review={review} />
        </div>
      )}
    </div>
  )
}

export default ReviewCard