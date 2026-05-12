import React from 'react'
import { getGenres } from '@/services/tmdb/shared';
import GenresButtonGroup from './GenresButtonGroup';

interface GenresProps {
  type: "movie" | "tv";
}

const Genres = async ({type} : GenresProps) => {
  const genres = await getGenres(type);

  return (
    <div>
      <p className='mb-4'>Genres</p>
      <div className='flex flex-col gap-4'>
        <GenresButtonGroup genres={genres} />
      </div>
    </div>
  )
}

export default Genres