"use client"
import Image from 'next/image'
import React, { useState } from 'react'

const PersonCard = ({person} : PersonCardProps) => {
  const [imgSrc, setImgSrc] = useState(`https://image.tmdb.org/t/p/w500/${person.profile_path}`);
  const imgSrcAlt = "/default-person-img.svg";
   
  return (
    <div className='flex flex-col'>
      <div className="h-[225px] w-[150px]">
        <Image 
          src={imgSrc} 
          alt={person.name! || person.original_name!} 
          className='h-full w-full rounded-[8px] bg-[#dbdbdb]'
          width={150}
          height={225} 
          onError={() => setImgSrc(imgSrcAlt)}
        />
      </div>
      <div className="px-[8px] py-[15px]">
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