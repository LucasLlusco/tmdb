import React from 'react'
import { Badge } from '../ui/badge';
import { getTvShowKeywordsById } from '@/services/tmdb/tvShows';
import { getMovieKeywordsById } from '@/services/tmdb/movies';
import Link from 'next/link';

interface MediaKeywordsProps {
  mediaId: number;
  mediaType: "movie" | "tv";
}

const MediaKeywords = async ({mediaId, mediaType} : MediaKeywordsProps) => {
  const keywords = mediaType === "movie" ? await getMovieKeywordsById(mediaId, mediaType) : await getTvShowKeywordsById(mediaId, mediaType);

  return (
    <div className='flex flex-wrap gap-[5px] justify-start'>
      {keywords.map((keyword) => {
        const keywordJSON = JSON.stringify([keyword]);
        const pathname = `/discover/${mediaType}?keywords=${keywordJSON}`

        return (
          <Link key={keyword.id} href={pathname}>
            <Badge key={keyword.id} variant={"secondary"}>{keyword.name}</Badge>
          </Link>
        )
      })}
      
    </div>
  )
}

export default MediaKeywords