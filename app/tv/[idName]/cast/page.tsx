import CastMemberlist from '@/components/shared/CastMemberList';
import CrewMemberList from '@/components/shared/CrewMemberList';
import MediaHeader from '@/components/shared/MediaHeader';
import ScrollToTop from '@/components/shared/ScrollToTop';
import { getTvShowById, getTvShowCreditsById } from '@/services/tmdb/tvShows';
import Link from 'next/link';
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

  const firstThree = ["Directing", "Writing", "Cast"];
  const sortedDepartments = [
    ...firstThree,
    ...uniqueDepartments.filter(department => !firstThree.includes(department))
  ]
  
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
      <ScrollToTop />
      <div className="container">
        <h4 className="font-bold">Jump to</h4>
        <ul className='flex flex-col text-sm'>
          {sortedDepartments.map((department) => {
            const membersCount = crew.filter((person) => person.department === department).length;
            if(department === "Cast") return <Link key={department} href={`#Cast`} className="w-fit">{department} ({cast.length})</Link>
            return <Link key={department} href={`#${department}`} className="w-fit">{department} ({membersCount})</Link>
          }
          )}
        </ul>
      </div>
      {sortedDepartments.map((department) => {
        const members = crew.filter((person) => person.department === department);
        if(department === "Cast") return (
          <section className='container'>
            <h3 className='section-title' id="Cast">Cast <span className='font-normal'>{cast.length}</span></h3>
            <CastMemberlist cast={cast} variant="tv" direction="grid" />
          </section>            
        )
        return (
          <section className='container'>              
            <h3 className='section-title' id={department}>{department} <span className='font-normal'>{members.length}</span></h3>
            <CrewMemberList crew={members} variant="tv" />
          </section>            
        )
      })}
    </main>
  )
}

export default TvShowCastPage
