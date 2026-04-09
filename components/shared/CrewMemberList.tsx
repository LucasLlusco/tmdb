import React from 'react'
import PersonCard from './PersonCard';

type CrewMemberListProps =
  | { 
    crew: MovieCrewMember[];
    variant: "movie";
  }
  | { 
    crew: TvShowCrewMember[];
    variant: "tv";
  }

const CrewMemberList = ({crew, variant} : CrewMemberListProps) => {
  
  return (
    <article className='grid grid-cols-2 gap-5'>
      {variant === "movie"
        ? (crew as MovieCrewMember[]).map((person) => (
            <PersonCard
              key={person.id}
              name={person.name}
              profile_path={person.profile_path}
              character={person.job}
              direction="grid"
            />
          ))
        : (crew as TvShowCrewMember[]).map((person) => (
            <PersonCard
              key={person.id}
              name={person.name}
              profile_path={person.profile_path}
              jobs={person.jobs}
              direction="grid"
            />
          ))
      }
    </article>
  )
}

export default CrewMemberList