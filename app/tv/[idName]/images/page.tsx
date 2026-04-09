import ImageCard from '@/components/shared/ImageCard';
import MediaHeader from '@/components/shared/MediaHeader';
import { getMediaImagesById } from '@/services/tmdb/shared';
import { getTvShowById } from '@/services/tmdb/tvShows';
import React from 'react'

interface TvShowImagesPageProps {
  params: {
    idName: string;
  }
}

const TvShowImagesPage = async ({params} : TvShowImagesPageProps) => {
  const id = Number(params.idName.split("-")[0]);
  const basePathname = `/tv/${params.idName}`;

  const data = await Promise.all([getTvShowById(id), getMediaImagesById(id, 'tv')]); 
  const tvShow = data[0];
  const { backdrops, posters } = data[1];

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
        <h3 className='section-title'>Backdrops <span className='font-normal'>{backdrops.length}</span></h3>
        <article className='grid grid-cols-4 gap-5'>
          {backdrops.map((backdrop) => (
            <ImageCard
              key={backdrop.file_path}
              image={backdrop}
              width={245}
              height={170}
            />
          ))}
        </article>
      </section>
      <section className='container'>
        <h3 className='section-title'>Posters <span className='font-normal'>{posters.length}</span></h3>
        <article className='grid grid-cols-6 gap-5'>
          {posters.map((poster) => (
            <ImageCard
              key={poster.file_path}
              image={poster}
              width={150}
              height={225}
            />
          ))}
        </article>
      </section>
    </main>
  )
}

export default TvShowImagesPage