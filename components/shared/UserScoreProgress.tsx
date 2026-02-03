import { getUserScore, getUserScoreColor } from '@/lib/utils';
import React from 'react'

interface UserScoreProgressProps {
  vote_average: number
  absolute?: boolean
}

const UserScoreProgress = ({vote_average, absolute} : UserScoreProgressProps) => {
  const progressValue = getUserScore(vote_average);
  const progresscolor = getUserScoreColor(getUserScore(vote_average));
  const circularProgressStyles = {
    background: `conic-gradient(${progresscolor.bar} ${progressValue * 3.6}deg, ${progresscolor.track} 0deg)`,
  }

  return (
    <div className={`${absolute && "absolute"} top-[-27px] w-[40px] h-[40px] rounded-full bg-black`} >
      <div className="circularProgress" style={circularProgressStyles}>
        <span className="circularProgress-value">{progressValue ? `${progressValue}%` : "NR"}</span>
      </div>
    </div>
  )
}

export default UserScoreProgress