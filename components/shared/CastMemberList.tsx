import React from 'react'
import PersonCard from './PersonCard'
import { cn } from '@/lib/utils';

type CastMemberlistProps =
  | { 
    cast: MovieCastMember[]; 
    variant: "movie";
    direction: "row" | "grid";
  }
  | { 
    cast: TvShowCastMember[]; 
    variant: "tv";
    direction: "row" | "grid";
  }

const CastMemberlist = ({cast, variant, direction} : CastMemberlistProps) => {

  return (
    <article className={cn({
      "flex gap-[10px] flex-row overflow-x-scroll" : direction === "row",
      "grid grid-cols-2 gap-5" : direction === "grid"
    })}>
      {variant === "movie"
        ? (cast as MovieCastMember[]).map((person) => (
            <PersonCard
              key={person.id}
              name={person.name}
              profile_path={person.profile_path}
              character={person.character}
              direction={direction}
            />
          ))
        : (cast as TvShowCastMember[]).map((person) => (
            <PersonCard
              key={person.id}
              name={person.name}
              profile_path={person.profile_path}              
              character={person.roles[0].character}
              episodeCount={person.total_episode_count}
              direction={direction}
            />
          ))
      }
    </article>
  )
}

export default CastMemberlist