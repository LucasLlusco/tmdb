import MediaList from '@/components/common/MediaList';
import { getSearchedItems } from '@/lib/actions/search.actions';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import React from 'react'

interface SearchPageProps {
  searchParams: {
    query: string,
    type?: string,
    page?: string 
  }
}

const SearchPage = async ({searchParams}: SearchPageProps) => {

  const movieResults = await getSearchedItems({
    query: searchParams.query,
    type: searchParams.type || "movie",
    page: searchParams.page || 1
  });

  const tvResults = await getSearchedItems({
    query: searchParams.query,
    type: searchParams.type || "tv",
    page: searchParams.page || 1
  });

  return (
    <main className='container my-8 flex flex-row gap-5'>
      <aside className="aside-section">
        <div className="aside-box">          
          <h2>Search Results</h2>
          <p>query: {searchParams.query}</p>
          <Tabs defaultValue="movie">
            <TabsList className='tabsList-col'>
              <TabsTrigger value="movie"><span>Movies</span><span>{movieResults?.total_results}</span></TabsTrigger>
              <TabsTrigger value="tv"><span>TV Shows</span><span>{tvResults?.total_results}</span></TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </aside>
      <section className='main-section'>
        {movieResults?.results && (
          <MediaList items={movieResults?.results} />
        )}
      </section>
    </main>
  )
}

export default SearchPage