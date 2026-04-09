import { getMovieCreditsById } from '@/services/tmdb/movies'
import React from 'react'
import CastMemberList from '../shared/CastMemberList';
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
      <CastMemberList cast={cast.slice(0, 20)} variant="movie" direction="row" />
    </section>
  )
}

export default MovieCast