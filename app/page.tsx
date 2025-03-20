import PopularPreview from '@/components/home/PopularPreview'
import SearchBarPreview from '@/components/home/SearchBarPreview'
import TrendingPreview from '@/components/home/TrendingPreview'
import React from 'react'

const Home = async () => {

  return (
    <main>
      <section className={"py-8 text-white bg-hero"}>
        <div className='container'>
          <h2 className='text-[50px] font-bold'>Welcome.</h2>
          <h3 className='text-[32px]'>Millions of movies, TV shows to discover. Explore now.</h3>   
          <SearchBarPreview /> 
        </div>
      </section>
      <TrendingPreview />
      <PopularPreview />
    </main>
  )
}

export default Home