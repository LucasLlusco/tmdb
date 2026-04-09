import React from 'react'
import ImageWithFallback from './ImageWithFallback'
import { cn } from '@/lib/utils';

interface PersonCardProps {
  name: string;
  profile_path: string;
  character?: string;
  episodeCount?: number;
  jobs?: {
    credit_id: string;
    job: string;
    episode_count: number;
  }[];
  direction: "row" | "grid";
}

const PersonCard = ({name, profile_path, character, episodeCount, jobs, direction} : PersonCardProps) => {
  const imageError = "/default-person-img.svg";

  const height = direction === "row" ? 225 : 75;
  const width = direction === "row" ? 150 : 70;
   
  return (
    <div className={cn('flex', {
      "flex-col" : direction === "row",
      "flex-row items-center" : direction === "grid"
      })}>
      <div className={cn({
        "h-[225px] w-[150px]" : direction === "row",
        "h-[75px] w-[70px]" : direction === "grid"
      })}>
        <ImageWithFallback
          src={profile_path} 
          alt={name} 
          className="h-full w-full rounded-[8px] bg-[#dbdbdb]"
          width={width}
          height={height}
          imageErrorSrc={imageError}
        />
      </div>
      <div className={cn("px-[8px]", {
        "py-[15px]" : direction === "row"
        })}>
        <p className='text-base font-bold'>
          {name}
        </p>
        {jobs && (
          <div className='text-xs text-gray-500'>
            {jobs.map((job) => (
              <span key={job.credit_id}>
                {`${job.job} (${job.episode_count} Episodes)`}
              </span>
            )).reduce((prev, curr):any => [prev, ", ", curr])}
          </div>
        )}
        {character && (
          <span className='text-xs text-gray-500'>
            {character} {episodeCount && direction === "grid" && `(${episodeCount} Episodes)`}
          </span>          
        )}
      </div>
    </div>
  )
}

export default PersonCard