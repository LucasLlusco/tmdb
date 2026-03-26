import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import VideoPlayer from '../shared/VideoPlayer';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getMediaVideosById } from '@/services/tmdb/shared';

interface MediaVideosProps {
  mediaId: number;
  mediaType: "movie" | "tv";
  basePathname: string;
}

const MediaVideos = async ({mediaId, mediaType, basePathname}: MediaVideosProps) => {
  const { trailers, videos } = await getMediaVideosById(mediaId, mediaType);

  return (
    <section className='container'>
      <div className="flex mb-6 gap-2">
        <h3 className='section-title !mb-0'>Videos</h3>
        <Link href={`${basePathname}/videos`} className='flex items-center'>{trailers.length + videos.length}<ChevronRight /></Link>
      </div>
      <Tabs defaultValue="trailers">
        <TabsList>
          <TabsTrigger value="trailers">Trailers {trailers.length}</TabsTrigger>
          <TabsTrigger value="videos">Videos {videos.length}</TabsTrigger>
        </TabsList>
        <TabsContent value="trailers" className='media-list'>
          <div className="flex flex-row">
            {trailers.map((video) => (
              <VideoPlayer key={video.id} videoUrl={video.key} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="videos" className='media-list'>
          <div className="flex flex-row">
            {videos.slice(0,6).map((video) => (
              <VideoPlayer key={video.id} videoUrl={video.key} />
            ))}            
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}

export default MediaVideos