import React from 'react'
import { getProvidersByRegion } from '@/services/tmdb/shared'
import ProvidersButtonGroup from './ProvidersButtonGroup'

interface ProvidersProps {
  type: "movie" | "tv";
  selectedRegion: string;
}

const Providers = async ({type, selectedRegion} : ProvidersProps) => {
  const providers = await getProvidersByRegion(type, selectedRegion);

  return (
    <ProvidersButtonGroup providers={providers} />
  )
}

export default Providers