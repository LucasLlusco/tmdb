import React from 'react'
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getMediaVideosById } from '@/services/tmdb/shared';
import VideoCard from './VideoCard';

interface MediaVideosProps {
  mediaId: number;
  mediaType: "movie" | "tv";
  mediaTitle: string;
  basePathname: string;
}

const MediaVideos = async ({mediaId, mediaType, mediaTitle, basePathname}: MediaVideosProps) => {
  const { trailers, videos } = await getMediaVideosById(mediaId, mediaType);
  const videosWithTrailer = [trailers[0], ...videos];

  return (
    <section className="container !px-0">
      <div className="flex mb-6 gap-2">
        <h3 className='section-title !mb-0'>Videos</h3>
        <Link href={`${basePathname}/videos`} className='flex items-center'>{trailers.length + videos.length}<ChevronRight /></Link>
      </div>
      <article className="grid grid-cols-3 gap-4">
        {videosWithTrailer.length > 0 ? (
          <>
          {videosWithTrailer.slice(0, 3).map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              showDetails={true}
            />
          ))}
          </>
        ) : (
          <p>There are no videos added to {mediaTitle}</p>
        )}
      </article>
    </section>
  )
}

export default MediaVideos