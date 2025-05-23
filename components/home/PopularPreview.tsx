"use client"
import React, { useEffect, useState } from 'react'
import MediaList from '../shared/MediaList';
import { getPopular } from '@/services/tmdb/shared';
import { POPULAR_FILTERS } from '@/constants';
import Filters from './Filters';

const PopularPreview = () => {
  const [popularList, setPopularList] = useState([]);

  const handleGetPopular = async (type:string) => {
    const popular = await getPopular(type);
    setPopularList(popular.results);
  }

  useEffect(() => {
    handleGetPopular(POPULAR_FILTERS[0].value);
  }, [])
  
  return (
    <section className='container'>
      <div className="flex gap-7 items-center">
        <h3 className='section-title'>What's popular</h3>
        <Filters filters={POPULAR_FILTERS} onClick={handleGetPopular} defaultValue={POPULAR_FILTERS[0].value} />
      </div>
      {popularList && (
        <MediaList items={popularList} direction='row' />
      )}
    </section>
  )
}

export default PopularPreview
