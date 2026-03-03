import { getUserScore, getUserScoreColor } from '@/lib/utils';
import { StarIcon } from 'lucide-react';
import React from 'react'

interface UserScoreProgressProps {
  vote_average: number;
  style: "rounded" | "badge";
  absolute?: boolean;
}

const UserScoreProgress = ({vote_average, style, absolute} : UserScoreProgressProps) => {
  const progressValue = getUserScore(vote_average);
  const progresscolor = getUserScoreColor(getUserScore(vote_average));
  const circularProgressStyles = {
    background: `conic-gradient(${progresscolor.bar} ${progressValue * 3.6}deg, ${progresscolor.track} 0deg)`,
  }

  return (
    <>
     {style === "badge" ? (
      <span className='bg-slate-800 text-white text-xs px-[5px] py-[5px] rounded-[5px] font-bold flex items-center gap-[5px]'>
        <StarIcon className={"w-[17px] h-[17px]"} />
        <span>{progressValue}%</span>
      </span> 
     ) : (
      <div className={`${absolute && "absolute"} top-[-27px] w-[40px] h-[40px] rounded-full bg-black`} >
        <div className="circularProgress" style={circularProgressStyles}>
          <span className="circularProgress-value">{progressValue ? `${progressValue}%` : "NR"}</span>
        </div>
      </div>
     )}
    </>
  )
}

export default UserScoreProgress