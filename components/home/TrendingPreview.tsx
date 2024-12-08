"use client"
import React, { useEffect, useState } from 'react'
import MediaList from '../shared/MediaList';
import { getTrending } from '@/services/tmdb/shared';
import { TRENDING_FILTERS } from '@/constants';
import Filters from './Filters';

const TrendingPreview = () => {
  const [trendingList, setTrendingList] = useState([]);

  const handleGetTrending = async (time:string) => {
    const trending = await getTrending(time);
    setTrendingList(trending.results);
  }

  useEffect(() => {
    handleGetTrending(TRENDING_FILTERS[0].value);
  }, [])
  
  return (
    <section className='container my-8 px-6'>
      <div className="flex gap-7 items-center mb-6 ">
        <h3 className='text-xl'>Trending</h3>
        <Filters filters={TRENDING_FILTERS} onClick={handleGetTrending} defaultValue={TRENDING_FILTERS[0].value} />
      </div>
      {trendingList && (
        <MediaList items={trendingList} />
      )}
    </section>
  )
}

export default TrendingPreview