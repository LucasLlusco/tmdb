"use client"
import { getPopular } from '@/lib/actions/movies.actions';
import React, { useEffect, useState } from 'react'
import ButtonGroup from './ButtonGroup';
import MediaList from '../common/MediaList';

const FILTERS = [
  {
    name: "Movies",
    value: "movie"
  },
  {
    name: "TV",
    value: "tv"
  }
]

const PopularPreview = () => {
  const [popularList, setPopularList] = useState([]);

  const handleGetPopular = async (type:string) => {
    const popular = await getPopular(type);
    setPopularList(popular.results);
  }

  useEffect(() => {
    handleGetPopular(FILTERS[0].value);
  }, [])

  return (
    <section className='container my-8 px-6'>
      <div className="flex gap-7 items-center mb-6 ">
        <h3 className='text-xl'>What's popular</h3>
        <ButtonGroup buttons={FILTERS} onClick={handleGetPopular} />
      </div>
      {popularList && (
        <MediaList items={popularList} />
      )}
    </section>
  )
}

export default PopularPreview