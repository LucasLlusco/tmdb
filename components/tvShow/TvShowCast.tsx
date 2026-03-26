import { getTvShowCreditsById } from '@/services/tmdb/tvShows';
import React from 'react'
import PersonList from '../shared/PersonList';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface TvShowCastProps {
  tvShowId: number;
  basePathname: string;
}

const TvShowCast = async ({tvShowId, basePathname}: TvShowCastProps) => {
  const { cast } = await getTvShowCreditsById(tvShowId);  

  return (
    <section className='container'>
      <div className="flex mb-6 gap-2">
        <h3 className='section-title !mb-0'>Top cast</h3>
        <Link href={`${basePathname}/cast`} className='flex items-center'>{cast.length}<ChevronRight /></Link>
      </div>
      <PersonList cast={cast} variant="tv" />
    </section>
  )
}

export default TvShowCast