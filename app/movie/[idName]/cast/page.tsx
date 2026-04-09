import CastMemberlist from '@/components/shared/CastMemberList';
import CrewMemberList from '@/components/shared/CrewMemberList';
import MediaHeader from '@/components/shared/MediaHeader';
import { getMovieById, getMovieCreditsById } from '@/services/tmdb/movies';
import React from 'react'

interface MovieCastPageProps {
  params: {
    idName: string;
  }
}

const MovieCastPage = async ({params}: MovieCastPageProps) => {
  const id = Number(params.idName.split("-")[0]);
  const basePathname = `/movie/${params.idName}`;

  const data = await Promise.all([getMovieById(id), getMovieCreditsById(id)]); 
  const movie = data[0];
  const { cast, crew } = data[1];

  const departments = crew.map((person) => person.department);
  const uniqueDepartments = Array.from(new Set(departments));

  const directors = crew.filter((person) => person.department === "Directing");
  const writers = crew.filter((person) => person.department === "Writing");
  
  return (
    <main>
      <MediaHeader
        basePathname={basePathname}
        name={movie.title}
        date={movie.release_date}
        image={movie.poster_path}
        bgImg={movie.backdrop_path}
        backLinkPathname={basePathname}
        backLinkText='Back to main'
      />
      <section className='container'>
        <h3 className='section-title'>Directing <span className='font-normal'>{directors.length}</span></h3>
        <CrewMemberList crew={directors} variant="movie" />
      </section>
      <section className='container'>
        <h3 className='section-title'>Writing <span className='font-normal'>{writers.length}</span></h3>
        <CrewMemberList crew={writers} variant="movie" />
      </section>
      <section className='container'>
        <h3 className='section-title'>Cast <span className='font-normal'>{cast.length}</span></h3>
        <CastMemberlist cast={cast} variant="movie" direction="grid" />
      </section>
      {uniqueDepartments.map((department) => {
        const members = crew.filter((person) => person.department === department);
        if(department !== "Directing" && department !== "Writing") return (
          <section className='container'>              
            <h3 className='section-title'>{department} <span className='font-normal'>{members.length}</span></h3>
            <CrewMemberList crew={members} variant="movie" />
          </section>            
        )
      })}
    </main>
  )
}

export default MovieCastPage