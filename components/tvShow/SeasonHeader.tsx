import { getYear } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface SeasonHeaderProps {
  basePathname: string,
  tvShow: TvShow
}

const SeasonHeader = ({basePathname, tvShow}: SeasonHeaderProps) => {
  const backgroundStyles = {
    backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${tvShow.backdrop_path})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }

  const backgroundOverlayStyles = {
    backgroundImage: `linear-gradient(to right, rgba(31.5, 10.5, 10.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 10.5, 10.5, 0.84) 50%, rgba(31.5, 10.5, 10.5, 0.84) 100%)`
  }
  
  return (
    <section style={backgroundStyles}>
      <div style={backgroundOverlayStyles}>
        <div className="container py-4 flex flex-row gap-[10px] items-center text-white">
          <Link href={basePathname}>
            <Image 
              src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`} 
              alt={tvShow.name} 
              className={"rounded-[5px]"}
              width={58}
              height={87}   
            />            
          </Link>
          <div className="flex flex-col gap-2">
            <div className='flex flex-row gap-2 items-end'>
              <h2 className='text-3xl font-bold'>
                <Link href={basePathname} className='link-white'>
                  {tvShow.name}
                </Link>
              </h2>
              <span className='text-2xl opacity-70'>({getYear(tvShow.first_air_date)})</span>             
            </div>
            <Link href={basePathname} className='w-fit flex items-center gap-[5px] font-bold text-gray-400 link-white'>
              <ArrowLeft className='w-[17px] h-[17px]' />
              Back to main
            </Link>
          </div>
        </div>            
      </div>
    </section>
  )
}

export default SeasonHeader