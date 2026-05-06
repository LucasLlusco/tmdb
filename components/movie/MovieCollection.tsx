import { getMovieCollectionById } from '@/services/tmdb/movies'
import React from 'react'
import MediaList from '../shared/MediaList';

interface MovieCollectionProps {
  collectionId: number;
}

const MovieCollection = async ({collectionId} : MovieCollectionProps) => {
  const collection = await getMovieCollectionById(collectionId);

  const backgroundStyles = {
    backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${collection.backdrop_path})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }

  const backgroundOverlayStyles = {
    backgroundImage: `linear-gradient(to right, rgba(31.5, 10.5, 10.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 10.5, 10.5, 0.84) 50%, rgba(31.5, 10.5, 10.5, 0.84) 100%)`
  }

  return (
    <section style={backgroundStyles} className="my-8 rounded-[8px]">
      <div style={backgroundOverlayStyles} className='text-white container rounded-[8px]'>
        <div className="pb-6">
          <h3 className="section-title !mb-0">{collection.name}</h3>
          <p>{collection.overview}</p>
        </div>
        <MediaList items={collection.parts} direction="row" />
      </div>
    </section>
  )
}

export default MovieCollection