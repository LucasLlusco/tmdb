"use client"
import React, { useState } from 'react'
import MediaList from '../shared/MediaList';
import { getTrending } from '@/services/tmdb/shared';
import Filters from './Filters';
import { TRENDING_FILTERS } from '@/constants';
import { useQuery } from '@tanstack/react-query';

const TrendingPreview = () => {
  const [time, setTime] = useState(TRENDING_FILTERS[0].value);

  const { data: trendingList, status } = useQuery({
    queryKey: ["trending", time],
    queryFn: () => getTrending(time)
  });

  return (
    <section className='container'>
      <div className="flex gap-7 items-center">
        <h3 className='section-title'>Trending</h3>
        <Filters filters={TRENDING_FILTERS} defaultValue={time} setFilter={setTime} />
      </div>
      {status === "pending" && <p>loading...</p>}
      {status === "error"  && <p>error</p>}
      {status === "success"  && <MediaList items={trendingList} direction='row' />}
    </section>
  )
}

export default TrendingPreview