import React from 'react'
import PersonCard from './PersonCard'

type PersonListProps =
  | { 
    cast: MovieCastMember[]; 
    variant: "movie";
  }
  | { 
    cast: TvShowCastMember[]; 
    variant: "tv";
  }

const PersonList = ({cast, variant} : PersonListProps) => {

  return (
    <article className='flex gap-[10px] flex-row overflow-x-scroll'>
      {variant === "movie"
        ? (cast as MovieCastMember[]).slice(0, 20).map((person) => (
            <PersonCard
              key={person.id}
              name={person.name}
              character={person.character}
              profile_path={person.profile_path}
            />
          ))
        : (cast as TvShowCastMember[]).slice(0, 20).map((person) => (
            <PersonCard
              key={person.id}
              name={person.name}
              character={person.roles[0].character}
              profile_path={person.profile_path}
            />
          ))
      }
    </article>
  )
}

export default PersonList