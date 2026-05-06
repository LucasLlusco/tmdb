import MediaHeader from '@/components/shared/MediaHeader';
import ScrollToTop from '@/components/shared/ScrollToTop';
import VideoCard from '@/components/shared/VideoCard';
import { getMovieById } from '@/services/tmdb/movies';
import { getMediaVideosById } from '@/services/tmdb/shared';
import Link from 'next/link';
import React from 'react'

interface MovieVideosPageProps {
  params: {
    idName: string;
  }
}

const MovieVideosPage = async ({params} : MovieVideosPageProps) => {
  const id = Number(params.idName.split("-")[0]);
  const basePathname = `/movie/${params.idName}`;

  const data = await Promise.all([getMovieById(id), getMediaVideosById(id, 'movie')]); 
  const movie = data[0];
  const { trailers, videos } = data[1];

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
          <Link href="#Trailers" className="w-fit">Trailers ({trailers.length})</Link>
          <Link href="#Videos" className="w-fit">Videos ({videos.length})</Link>
        </ul>
      </div>
      <section className='container'>
        <h3 className='section-title' id="Trailers">Trailers <span className='font-normal'>{trailers.length}</span></h3>
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
            <p>There are no trailers added to {movie.title}</p>
          )}
        </article>
      </section>
      <section className='container'>
        <h3 className='section-title' id="Videos">Videos <span className='font-normal'>{videos.length}</span></h3>
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
            <p>There are no videos added to {movie.title}</p>
          )}
        </article>
      </section>
    </main>
  )
}

export default MovieVideosPage