import React from 'react'
import { Badge } from '../ui/badge';
import { getTvShowKeywordsById } from '@/services/tmdb/tvShows';
import { getMovieKeywordsById } from '@/services/tmdb/movies';

interface MediaKeywordsProps {
  mediaId: number;
  mediaType: "movie" | "tv";
}

const MediaKeywords = async ({mediaId, mediaType} : MediaKeywordsProps) => {
  const keywords = mediaType === "movie" ? await getMovieKeywordsById(mediaId, mediaType) : await getTvShowKeywordsById(mediaId, mediaType);

  return (
    <div className='flex flex-wrap gap-[5px] justify-start'>
      {keywords.map((keyword) => (
        <Badge key={keyword.id} variant={"secondary"}>{keyword.name}</Badge>
      ))}
    </div>
  )
}

export default MediaKeywords