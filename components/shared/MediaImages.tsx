import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import ImageWithFallback from '../shared/ImageWithFallback';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getMediaImagesById } from '@/services/tmdb/shared';

interface MediaImagesProps {
  mediaId: number;
  mediaType: "movie" | "tv";
  basePathname: string;
}

const MediaImages = async ({mediaId, mediaType, basePathname}: MediaImagesProps) => {
  const { backdrops, posters } =  await getMediaImagesById(mediaId, mediaType);

  return (
    <section className='container'>
      <div className="flex mb-6 gap-2">
        <h3 className='section-title !mb-0'>Images</h3>
        <Link href={`${basePathname}/images`} className='flex items-center'>{backdrops.length + posters.length}<ChevronRight /></Link>
      </div>
      <Tabs defaultValue="backdrops">
        <TabsList>
          <TabsTrigger value="backdrops">Backdrops {backdrops.length}</TabsTrigger>
          <TabsTrigger value="posters">Posters {posters.length}</TabsTrigger>
        </TabsList>
        <TabsContent value="backdrops" className='media-list'>
          <div className="flex flex-row">
            {backdrops.slice(0,6).map((image) => (
              <ImageWithFallback
                key={image.file_path}         
                src={image.file_path} 
                alt={image.file_path} 
                width={529}
                height={300}     
                className='h-[300px]'
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="posters" className='media-list'>
          <div className="flex flex-row">
            {posters.slice(0,7).map((image) => (
              <ImageWithFallback 
                key={image.file_path}         
                src={image.file_path}
                alt={image.file_path} 
                width={200}
                height={300}   
                className='h-[300px]'
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}

export default MediaImages