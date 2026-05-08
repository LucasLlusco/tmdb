import React from 'react'
import EditReviewForm from '../user/reviews/EditReviewForm';
import DeleteReviewForm from '../user/reviews/DeleteReviewForm';
import Link from 'next/link';
import { getFormattedDate } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ImageWithFallback from '@/components/shared/ImageWithFallback';
import { Separator } from '@/components/ui/separator';
import ReactReviewForm from '../user/reviews/ReactReviewForm';
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Ellipsis } from 'lucide-react';

type ReviewCardProps =
  | { 
    review: ReviewDocument; 
    currentUserId: string | null; 
    isOwner: boolean;
    queryKey: unknown[];
    showUser: false; 
    showPreviewContent?: boolean;
  }
  | { 
    review: ReviewWithUser; 
    currentUserId: string | null;
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
    <div className='flex flex-col card-boxshadow relative rounded-[5px] py-[5px] px-[10px]'>
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
          <p className='text-xs text-gray-500'>
            {getFormattedDate(review.$createdAt)}
          </p>         
        </>
      )}

      {showUser && (
        <div className="flex gap-2 items-center">
          {avatarPath ? (
            <Avatar className={"w-10 h-10"} >
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>{review.user.username}</AvatarFallback>
            </Avatar>
            ) : (
              <span className='bg-cyan-600 text-white flex items-center justify-center rounded-full w-10 h-10 uppercase font-bold'>
                {initial}
              </span>
            )}
          <div className="flex flex-col">
            <Link href={`/user/${review.userId}`} className="link-black font-bold text-sm">{review.user.username}</Link>
            <p className="text-xs text-gray-500 mt-[2px]">{getFormattedDate(review.$createdAt)}</p>
          </div>
        </div>
      )}

      {isOwner && (
        <div className="absolute top-[10px] right-[10px] z-[5]">
          <DropdownMenu>
            <DropdownMenuTrigger className='bg-slate-400 hover:bg-teal-500 h-[19px] w-[19px] rounded-full'>
              <Ellipsis className='w-auto h-[19px]' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <div className='flex flex-col'>
                  <EditReviewForm review={review} />
                  <DropdownMenuSeparator />
                  <DeleteReviewForm review={review} />
                </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>        
      )}

      <h4 className='font-bold mt-[10px]'>{review.title}</h4>
      <p className={`${showPreviewContent && "overflow-txt"} mt-[5px] text-sm`}>{review.content}</p>
      <ReactReviewForm review={review} currentUserId={currentUserId} isOwner={isOwner} queryKey={queryKey} />
    </div>
  )
}

export default ReviewCard