import MediaList from '@/components/common/MediaList'
import SearchPreview from '@/components/home/SearchPreview'
import { getPopular, getTrending } from '@/lib/actions/movies.actions'
import React from 'react'

const Home = async () => {
  const trending = await getTrending();
  const popular = await getPopular();


  return (
    <main>
      <SearchPreview />
      <section className='container my-8 px-6'>
        <h3 className='mb-6 text-xl'>Trending</h3>
        {trending?.results && (
          <MediaList items={trending.results} />
        )}
      </section>
      <section className='container my-8 px-6'>
        <h3 className='mb-6 text-xl'>What's popular</h3>
        {popular?.results && (
          <MediaList items={popular.results} />
        )}
      </section>
    </main>
  )
}

export default Home
