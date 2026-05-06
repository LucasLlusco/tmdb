import MovieCast from '@/components/movie/MovieCast';
import MovieCollection from '@/components/movie/MovieCollection';
import MovieInfo from '@/components/movie/MovieInfo';
import MovieRecommendations from '@/components/movie/MovieRecommendations';
import MovieReviews from '@/components/movie/MovieReviews';
import MediaImages from '@/components/shared/MediaImages';
import MediaKeywords from '@/components/shared/MediaKeywords';
import MediaVideos from '@/components/shared/MediaVideos';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getMovieById } from '@/services/tmdb/movies';
import { ExternalLink } from 'lucide-react';
import React from 'react'

interface moviePageProps {
  params: {
    idName: string;
  } 
}

const MoviePage = async ({params}: moviePageProps) => {
  const id = Number(params.idName.split("-")[0]); 
  const movie = await getMovieById(id);

  const basePathname = `/movie/${params.idName}`;

  return (
    <main>
      <MovieInfo movie={movie} />
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-[1fr_250px] gap-5 !pt-0">
        <div className="main-section">
          <MovieCast movieId={id} basePathname={basePathname} />
          <MediaImages mediaId={id} mediaType="movie" basePathname={basePathname} />
          <MediaVideos mediaId={id} mediaType="movie" mediaTitle={movie.title} basePathname={basePathname} />
          <MovieReviews movieId={id} />
          {movie.belongs_to_collection && <MovieCollection collectionId={movie.belongs_to_collection.id} />}
          <div className="container !px-0 !py-4">
            <Separator />
          </div>
          <MovieRecommendations movieId={id} />            
        </div>
        <aside className="aside-section mt-8 ">
          <p className="flex gap-2 items-center"><strong>Visit Homepage</strong>
            <a href={movie.homepage} className="w-fit" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-5 h-5" />
            </a>
          </p>
          <p>
            <strong className='block'>
              Status
            </strong>
            {movie.status}
          </p>
          <p>
            <strong className='block'>
              Original Language
            </strong>
            {movie.original_language}
          </p>
          <p>
            <strong className='block'>
              Budget
            </strong>
            ${movie.budget.toLocaleString()}
          </p>
          <p>
            <strong className='block'>
              Revenue
            </strong>
            ${movie.revenue.toLocaleString()}
          </p>
          <div>
            <strong className='block mb-[5px]'>Production Companies</strong>
            <div className="flex flex-wrap gap-[5px] justify-start">
              {movie.production_companies.map((company) => (
                <Badge key={company.id} variant={"secondary"}>{company.name}</Badge>
              ))}      
            </div>
          </div>
          <div>
            <strong className='block mb-[5px]'>Keywords</strong>
            <MediaKeywords mediaId={movie.id} mediaType={"movie"} />
          </div>
        </aside>
      </div>
    </main>
  )
}

export default MoviePage