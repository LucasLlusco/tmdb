"use client"
import React, { useState } from 'react'
import MediaList from '../shared/MediaList';
import { getPopular } from '@/services/tmdb/shared';
import { POPULAR_FILTERS } from '@/constants';
import Filters from './Filters';
import { useQuery } from '@tanstack/react-query';

const PopularPreview = () => {
  const [type, setType] = useState(POPULAR_FILTERS[0].value);

  const { data: popularList, status } = useQuery({
    queryKey: ["popular", type], 
    queryFn: () => getPopular(type)
  });
  
  return (
    <section className='container'>
      <div className="flex gap-7 items-center">
        <h3 className='section-title'>What's popular</h3>
        <Filters filters={POPULAR_FILTERS} defaultValue={type} setFilter={setType} />
      </div>
      {status === "pending" && <p>loading...</p>}
      {status === "error"  && <p>error</p>}
      {status === "success"  && <MediaList items={popularList} direction='row' />}
    </section>
  )
}

export default PopularPreview