import React from 'react'
import VideoPlayer from './VideoPlayer';
import { getFormattedDate } from '@/lib/utils';

interface VideoCardProps {
  video: Video;
  showDetails: boolean;
}

const VideoCard = ({video, showDetails} : VideoCardProps) => {
  return (
    <>
      {showDetails ? (
        <div className='flex flex-col'>
          <VideoPlayer
            videoUrl={video.key} 
            width={529} 
            height={300} 
            className={`max-h-[300px] w-full rounded-[8px]`} 
          />
          <div className="px-[8px] py-[15px]">
            <p className='text-base font-bold'>{video.name}</p>
            <span className='text-xs text-gray-500'>{video.published_at && getFormattedDate(video.published_at, false)}</span>                 
          </div>
        </div>
      ) : (
        <VideoPlayer 
          videoUrl={video.key} 
          width={529}
          height={300} 
          className={`max-h-[300px] w-full rounded-[8px]`} 
        />
      )}
    </>
  )
}

export default VideoCard