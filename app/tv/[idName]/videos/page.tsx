import MediaHeader from '@/components/shared/MediaHeader';
import VideoCard from '@/components/shared/VideoCard';
import { getMediaVideosById } from '@/services/tmdb/shared';
import { getTvShowById } from '@/services/tmdb/tvShows';
import React from 'react'

interface TvShowVideosPageProps {
  params: {
    idName: string;
  }
}

const TvShowVideosPage = async ({params} : TvShowVideosPageProps) => {
  const id = Number(params.idName.split("-")[0]);
  const basePathname = `/tv/${params.idName}`;

  const data = await Promise.all([getTvShowById(id), getMediaVideosById(id, 'tv')]); 
  const tvShow = data[0];
  const { trailers, videos } = data[1];

  return (
    <main>
      <MediaHeader
        basePathname={basePathname}
        name={tvShow.name}
        date={tvShow.first_air_date}
        image={tvShow.poster_path}
        bgImg={tvShow.backdrop_path}
        backLinkPathname={basePathname}
        backLinkText='Back to main'
      />
      <section className='container'>
        <h3 className='section-title'>Trailers <span className='font-normal'>{trailers.length}</span></h3>
        <article className='grid grid-cols-3 gap-5'>
          {trailers.length > 0 ? (
            <>
            {trailers.map((trailer) => (
              <VideoCard
                key={trailer.id}
                video={trailer}
                showDetails={true}
              />
            ))}
            </>
          ) : (
            <p>There are no trailers added to {tvShow.name}</p>
          )}
        </article>
      </section>
      <section className='container'>
        <h3 className='section-title'>Videos <span className='font-normal'>{videos.length}</span></h3>
        <article className='grid grid-cols-3 gap-5'>
          {videos.length > 0 ? (
            <>
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                showDetails={true}
              />
            ))}
            </>
          ) : (
            <p>There are no videos added to {tvShow.name}</p>
          )}
        </article>
      </section>
    </main>
  )
}

export default TvShowVideosPage