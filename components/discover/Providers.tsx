"use client"
import React, { useEffect, useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { getAvailableRegions, getProvidersByRegion } from '@/services/tmdb/shared'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'
import Image from 'next/image'
import { Check } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

interface ProvidersProps {
  type: string
  filters: DiscoverFiltersType,
  setFilters: React.Dispatch<React.SetStateAction<DiscoverFiltersType>>
}

const Providers = ({type, filters, setFilters}:ProvidersProps) => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);

  const handleFetchProviders = async (region: string) => {
    const formattedParams = {
      type: type,
      params: {
        "watch_region": region
      }
    }
    const providers = await getProvidersByRegion(formattedParams);
    setProviders(providers.results);
    setFilters(prevFilters => ({
      ...prevFilters,
      selectedRegion: region,
      selectedProviders: []
    }))
    
  }

  const handleFetchRegions = async () => {
    const regions = await getAvailableRegions();
    setRegions(regions.results);
  }
  
  useEffect(() => {
    handleFetchRegions();
  }, [])

  const handleSelectedProviders = (providersId: string[]) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      selectedProviders: providersId,
      filtersHasChanged: true
    }))
  }
  
  return (
    <Accordion type="single" collapsible className="aside-box card-boxshadow">
      <AccordionItem value="item-2" className='border-b-0'>
        <AccordionTrigger className='border-b mb-4'>Where to watch</AccordionTrigger>
        <AccordionContent className='flex flex-col gap-4'>
          <Select defaultValue={filters.selectedRegion} value={filters.selectedRegion} onValueChange={(value) => handleFetchProviders(value)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {regions?.map((region) => (
                <SelectItem value={region.iso_3166_1} key={region.iso_3166_1}>{region.english_name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ToggleGroup 
            type="multiple" 
            value={filters.selectedProviders} 
            onValueChange={(value) => handleSelectedProviders(value)} 
            className='providers-grid'
            >
            {providers?.map((provider) => (
              <ToggleGroupItem 
                value={provider.provider_id.toString()} 
                className='w-[50px] h-[50px] relative'
                >
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="provider-active">
                        <Check className='!w-[32px] !h-[32px]'/>
                      </div>
                      <Image
                        src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`} 
                        alt={provider.provider_name}
                        width={50}
                        height={50}
                        className='rounded-[6px] max-w-[50px]'
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      {provider.provider_name}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default Providers