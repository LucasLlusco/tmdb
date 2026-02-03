import React from 'react'
import ImageWithFallback from './ImageWithFallback'

interface PersonCardProps {
  person: Person
}

const PersonCard = ({person} : PersonCardProps) => {
  const imageError = "/default-person-img.svg";
   
  return (
    <div className='flex flex-col'>
      <div className="h-[225px] w-[150px]">
        <ImageWithFallback
          src={person.profile_path} 
          alt={person.name} 
          className="h-full w-full rounded-[8px] bg-[#dbdbdb]"
          width={150}
          height={225}
          imageErrorSrc={imageError}
        />
      </div>
      <div className="px-[8px] py-[15px]">
        <p className='text-base font-bold'>
          {person.name}
        </p>
        <span className='text-xs text-gray-500'>
          {person.character}
        </span>
      </div>
    </div>
  )
}

export default PersonCard