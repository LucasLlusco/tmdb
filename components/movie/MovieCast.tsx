import { getMovieCreditsById } from '@/services/tmdb/movies'
import React from 'react'
import PersonList from '../shared/PersonList';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface MovieCastProps {
  movieId: number;
  basePathname: string;
}

const MovieCast = async ({movieId, basePathname}: MovieCastProps) => {
  const { cast } = await getMovieCreditsById(movieId);

  return (
    <section className='container'>
      <div className="flex mb-6 gap-2">
        <h3 className='section-title !mb-0'>Top cast</h3>
        <Link href={`${basePathname}/cast`} className='flex items-center'>{cast.length}<ChevronRight /></Link>
      </div>
      <PersonList cast={cast} variant="movie" />
    </section>
  )
}

export default MovieCast