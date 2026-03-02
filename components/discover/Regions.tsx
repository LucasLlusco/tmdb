import React from 'react'
import { getAvailableRegions } from '@/services/tmdb/shared'
import RegionsSelect from './RegionsSelect'

interface RegionsProps {
  currentRegion: string;
}

const Regions = async ({currentRegion} : RegionsProps) => {
  const regions = await getAvailableRegions();

  return (
    <div>
      <p className='mb-4'>Where to watch</p>
      <RegionsSelect regions={regions} currentRegion={currentRegion} />
    </div>
  )
}

export default Regions