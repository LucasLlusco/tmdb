import Image from 'next/image'
import React from 'react'

const PersonCard = ({person} : PersonCardProps) => {
  return (
    <div className='flex flex-col'>
      <div className="h-[225px] w-[150px]">
        <Image 
          src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`} 
          alt={person.name! || person.original_name!} 
          className='h-full w-full rounded-[8px]'
          width={150}
          height={225} 
        />
      </div>
      <div className="w-[150px] pt-[10px] px-[5px] pb-[10px]">
        <p className='text-base font-bold'>
          {person?.name}
        </p>
        <span className='text-xs text-gray-500'>
          {person.character}
        </span>          
      </div>      
    </div>
  )
}

export default PersonCard