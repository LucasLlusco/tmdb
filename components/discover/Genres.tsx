import React from 'react'
import { getGenres } from '@/services/tmdb/shared';
import GenresButtonGroup from './GenresButtonGroup';

interface GenresProps {
  type: "movie" | "tv";
  currentGenres: string;
}

const Genres = async ({type, currentGenres} : GenresProps) => {
  const genres = await getGenres(type);

  return (
    <div>
      <p className='mb-4'>Filter by genres</p>
      <div className='flex flex-col gap-4'>
        <GenresButtonGroup genres={genres} currentGenres={currentGenres} />
      </div>
    </div>
  )
}

export default Genres