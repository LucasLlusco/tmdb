import React from 'react'

interface SearchPageProps {
  searchParams: {
    query: string
  }
}

const SearchPage = ({searchParams}: SearchPageProps) => {

  return (
    <div>
      <h1>SearchPage</h1>
      <h2>query: {searchParams.query}</h2>
    </div>
  )
}

export default SearchPage