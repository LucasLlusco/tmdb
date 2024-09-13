"use client"
import React, { useEffect, useState } from 'react'
import ButtonGroup from './ButtonGroup';
import MediaList from '../common/MediaList';
import { getTrending } from '@/lib/actions/movies.actions';

const FILTERS = [
  {
    name: "Today",
    value: "day"
  },
  {
    name: "This week",
    value: "week"
  }
]

const TrendingPreview = () => {
  const [trendingList, setTrendingList] = useState([]);

  const handleGetTrending = async (time:string) => {
    const trending = await getTrending(time);
    setTrendingList(trending.results);
  }

  useEffect(() => {
    handleGetTrending(FILTERS[0].value);
  }, [])
  
  return (
    <section className='container my-8 px-6'>
      <div className="flex gap-7 items-center mb-6 ">
        <h3 className='text-xl'>Trending</h3>
        <ButtonGroup buttons={FILTERS} onClick={handleGetTrending} />
      </div>
      {trendingList && (
        <MediaList items={trendingList} />
      )}
    </section>
  )
}

export default TrendingPreview