import ImageCard from '@/components/shared/ImageCard';
import MediaHeader from '@/components/shared/MediaHeader';
import ScrollToTop from '@/components/shared/ScrollToTop';
import { getMovieById } from '@/services/tmdb/movies';
import { getMediaImagesById } from '@/services/tmdb/shared';
import Link from 'next/link';
import React from 'react'

interface MovieImagesPageProps {
  params: {
    idName: string;
  }
}

const MovieImagesPage = async ({params} : MovieImagesPageProps) => {
  const id = Number(params.idName.split("-")[0]);
  const basePathname = `/movie/${params.idName}`;

  const data = await Promise.all([getMovieById(id), getMediaImagesById(id, 'movie')]); 
  const movie = data[0];
  const { backdrops, posters } = data[1];

  return (
    <main>
      <MediaHeader
        basePathname={basePathname}
        name={movie.title}
        date={movie.release_date}
        image={movie.poster_path}
        bgImg={movie.backdrop_path}
        backLinkPathname={basePathname}
        backLinkText='Back to main'
      />
      <ScrollToTop />
      <div className="container">
        <h4 className="font-bold">Jump to</h4>
        <ul className='flex flex-col text-sm'>
          <Link href="#Backdrops" className="w-fit">Backdrops ({backdrops.length})</Link>
          <Link href="#Posters" className="w-fit">Posters ({posters.length})</Link>
        </ul>
      </div>
      <section className='container'>
        <h3 className='section-title' id="Backdrops">Backdrops <span className='font-normal'>{backdrops.length}</span></h3>
        <article className='grid grid-cols-4 gap-5'>
          {backdrops.map((backdrop) => (
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
      <section className='container'>
        <h3 className='section-title' id="Posters">Posters <span className='font-normal'>{posters.length}</span></h3>
        <article className='grid grid-cols-6 gap-5'>
          {posters.map((poster) => (
            <ImageCard
              key={poster.file_path}
              src={poster.file_path}
              width={150}
              height={225}
              className="h-full w-full"
            />
          ))}
        </article>
      </section>
    </main>
  )
}

export default MovieImagesPage
