import { getFormattedDate, getRuntime } from '@/lib/utils';
import React from 'react'
import { Separator } from '../ui/separator';
import UserScoreProgress from '../shared/UserScoreProgress';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import ImageCard from '../shared/ImageCard';
import MediaToggleButtons from '../shared/MediaToggleButtons';
import { getMovieCreditsById } from '@/services/tmdb/movies';

interface MovieInfoProps {
  movie: Movie;
}

const MovieInfo = async ({movie}: MovieInfoProps) => {
  const { crew } = await getMovieCreditsById(movie.id);
  const directors = crew.filter((person) => person.department === "Directing" && person.job === "Director");
  const writers = crew.filter((person) => person.department === "Writing");

  const backgroundStyles = {
    backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }

  const backgroundOverlayStyles = {
    backgroundImage: `linear-gradient(to right, rgba(31.5, 10.5, 10.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 10.5, 10.5, 0.84) 50%, rgba(31.5, 10.5, 10.5, 0.84) 100%)`
  }

  return (
    <section style={backgroundStyles}>
      <div style={backgroundOverlayStyles}>
        <div className="flex flex-row container text-white">
          <div className="poster-wrapper flex items-center">
            <ImageCard
              src={movie.poster_path}
              width={300}
              height={450}  
              className="max-w-none"
            />
          </div>
          <div className="flex flex-col gap-4 justify-center pl-5">
            <div className="flex flex-col gap-1">
              <h2 className='text-3xl font-bold'>{movie.title}</h2>
              <div className="flex gap-2 items-center text-sm">
                <span className="opacity-70"> • {getFormattedDate(movie.release_date)}</span>
                <span className="opacity-70"> • {getRuntime(movie.runtime).hours}h {getRuntime(movie.runtime).minutes}min</span>                 
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (              
                <Link key={genre.id} href={`/discover/movie?genres=${genre.id}`}>
                  <Badge variant={"outline"} className="text-white border-gray-500 font-light">{genre.name}</Badge>
                </Link>
              ))}
            </div>
            <div className='flex gap-5'>
              <div className="flex items-center gap-2">
                <strong>User Score</strong>
                <UserScoreProgress vote_average={movie.vote_average} style="rounded" />                  
              </div>
              <Separator orientation='vertical' />
              <MediaToggleButtons mediaId={movie.id} mediaTitle={movie.title} mediaType="movie" />  
            </div>
            <div className="flex flex-col">
              <p className='opacity-70 italic'>{movie.tagline}</p>
              <p>
                <strong className="block">Overview</strong>
                {movie.overview}
              </p>
            </div>
            <p>
              <strong className="block">Director</strong>
              {directors.map((director => director.name)).join(", ")}   
            </p>
            <p>
              <strong className="block">Writer</strong>
              {writers.map((writer => writer.name)).join(", ")}   
            </p>     
          </div>
        </div>
      </div>
    </section>
  )
}

export default MovieInfo