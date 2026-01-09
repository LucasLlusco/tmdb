import { getTvShowImagesById, getTvShowVideosById } from '@/services/tmdb/tvShows';
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import VideoPlayer from '../shared/VideoPlayer';
import Image from 'next/image';

interface TvShowMediaProps {
  tvShowId: number
}

const TvShowMedia = async ({tvShowId}: TvShowMediaProps) => {
  const images = await getTvShowImagesById(tvShowId);
  const tvShowVideos = await getTvShowVideosById(tvShowId);

  const trailers = tvShowVideos.filter((video:Video)=> video.type === "Trailer");
  const videos = tvShowVideos.filter((video:Video) => video.type !== "Trailer");

  const backdrops = images.backdrops;
  const posters = images.posters;

  return (
    <section className='container'>
      <h3 className='section-title'>Media images & videos</h3>
      <Tabs defaultValue="trailers">
        <TabsList>
          <TabsTrigger value="trailers">Trailers {trailers.length}</TabsTrigger>
          <TabsTrigger value="videos">Videos {videos.length}</TabsTrigger>
          <TabsTrigger value="backdrops">Backdrops {backdrops.length}</TabsTrigger>
          <TabsTrigger value="posters">Posters {posters.length}</TabsTrigger>
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
        <TabsContent value="backdrops" className='media-list'>
          <div className="flex flex-row">
            {backdrops.slice(0,6).map((image) => (
              <Image 
                key={image.file_path}         
                src={`https://image.tmdb.org/t/p/w533_and_h300_bestv2/${image.file_path}`} 
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
              <Image 
                key={image.file_path}         
                src={`https://image.tmdb.org/t/p/w500/${image.file_path}`} 
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

export default TvShowMedia