import React from 'react'
import { getProvidersByRegion } from '@/services/tmdb/shared'
import ProvidersButtonGroup from './ProvidersButtonGroup'

interface ProvidersProps {
  type: "movie" | "tv";
  currentRegion: string;
  currentProviders: string;
}

const Providers = async ({type, currentRegion, currentProviders} : ProvidersProps) => {
  const providers = await getProvidersByRegion(type, currentRegion);

  return (
    <ProvidersButtonGroup providers={providers} currentProviders={currentProviders} />
  )
}

export default Providers