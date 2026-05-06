import React from 'react'
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getMediaImagesById } from '@/services/tmdb/shared';
import ImageCard from './ImageCard';

interface MediaImagesProps {
  mediaId: number;
  mediaType: "movie" | "tv";
  basePathname: string;
}

const MediaImages = async ({mediaId, mediaType, basePathname}: MediaImagesProps) => {
  const { backdrops, posters } = await getMediaImagesById(mediaId, mediaType);

  return (
    <section className="container !px-0">
      <div className="flex mb-6 gap-2">
        <h3 className='section-title !mb-0'>Images</h3>
        <Link href={`${basePathname}/images`} className='flex items-center'>{backdrops.length + posters.length}<ChevronRight /></Link>
      </div>
      <article className='grid grid-cols-4 gap-4'>
        {backdrops.slice(0, 4).map((backdrop) => (
          <ImageCard
            key={backdrop.file_path}
            src={backdrop.file_path}
            width={245}
            height={170}
            className="h-full w-full"
          />
        ))}
      </article>      
    </section>
  )
}

export default MediaImages