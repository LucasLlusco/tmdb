import React from 'react'
import ImageWithFallback from './ImageWithFallback'

interface PersonCardProps {
  name: string;
  character: string;
  profile_path: string;
}

const PersonCard = ({name, character, profile_path} : PersonCardProps) => {
  const imageError = "/default-person-img.svg";
   
  return (
    <div className='flex flex-col'>
      <div className="h-[225px] w-[150px]">
        <ImageWithFallback
          src={profile_path} 
          alt={name} 
          className="h-full w-full rounded-[8px] bg-[#dbdbdb]"
          width={150}
          height={225}
          imageErrorSrc={imageError}
        />
      </div>
      <div className="px-[8px] py-[15px]">
        <p className='text-base font-bold'>
          {name}
        </p>
        <span className='text-xs text-gray-500'>
          {character}
        </span>
      </div>
    </div>
  )
}

export default PersonCard