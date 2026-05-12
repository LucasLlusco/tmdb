import React from 'react'
import { getAvailableRegions } from '@/services/tmdb/shared'
import RegionsSelect from './RegionsSelect'

const Regions = async () => {
  const regions = await getAvailableRegions();

  return (
    <div>
      <p className='mb-4'>Where to watch</p>
      <RegionsSelect regions={regions} />
    </div>
  )
}

export default Regions