"use client"
import React, { useEffect, useState } from 'react'
import MediaList from '../shared/MediaList';
import { getTrending } from '@/services/tmdb/shared';
import Filters from './Filters';
import { TRENDING_FILTERS } from '@/constants';

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
    <section className='container'>
      <div className="flex gap-7 items-center">
        <h3 className='section-title'>Trending</h3>
        <Filters filters={TRENDING_FILTERS} onClick={handleGetTrending} defaultValue={TRENDING_FILTERS[0].value} />
      </div>
      {trendingList && (
        <MediaList items={trendingList} direction='row'/>
      )}
    </section>
  )
}

export default TrendingPreview