import React from 'react'
import PersonCard from './PersonCard'

const PersonList = ({cast}:PersonListProps) => {
  return (
    <article className='flex gap-[10px] flex-row overflow-x-scroll '>
      {cast.slice(0,20).map((person: Person) => (
        <PersonCard key={person.id} person={person} />   
      ))}
    </article>
  )
}

export default PersonList