import CastMemberlist from '@/components/shared/CastMemberList';
import CrewMemberList from '@/components/shared/CrewMemberList';
import MediaHeader from '@/components/shared/MediaHeader';
import { getTvShowById, getTvShowCreditsById } from '@/services/tmdb/tvShows';
import React from 'react'

interface TvShowCastPageProps {
  params: {
    idName: string;
  }
}

const TvShowCastPage = async ({params}: TvShowCastPageProps) => {
  const id = Number(params.idName.split("-")[0]);
  const basePathname = `/tv/${params.idName}`;

  const data = await Promise.all([getTvShowById(id), getTvShowCreditsById(id)]); 
  const tvShow = data[0];
  const { cast, crew } = data[1];

  const departments = crew.map((person) => person.department);
  const uniqueDepartments = Array.from(new Set(departments));

  const directors = crew.filter((person) => person.department === "Directing");
  const writers = crew.filter((person) => person.department === "Writing");
  
  return (
    <main>
      <MediaHeader
        basePathname={basePathname}
        name={tvShow.name}
        date={tvShow.first_air_date}
        image={tvShow.poster_path}
        bgImg={tvShow.backdrop_path}
        backLinkPathname={basePathname}
        backLinkText='Back to main'
      />
      <section className='container'>
        <h3 className='section-title'>Directing <span className='font-normal'>{directors.length}</span></h3>
        <CrewMemberList crew={directors} variant="tv" />
      </section>
      <section className='container'>
        <h3 className='section-title'>Writing <span className='font-normal'>{writers.length}</span></h3>
        <CrewMemberList crew={writers} variant="tv" />
      </section>
      <section className='container'>
        <h3 className='section-title'>Cast <span className='font-normal'>{cast.length}</span></h3>
        <CastMemberlist cast={cast} variant="tv" direction="grid" />
      </section>
      {uniqueDepartments.map((department) => {
        const members = crew.filter((person) => person.department === department);
        if(department !== "Directing" && department !== "Writing") return (
          <section className='container'>              
            <h3 className='section-title'>{department} <span className='font-normal'>{members.length}</span></h3>
            <CrewMemberList crew={members} variant="tv" />
          </section>            
        )
      })}
    </main>
  )
}

export default TvShowCastPage
