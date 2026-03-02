"use client"
import React from 'react'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { Check } from 'lucide-react'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface ProvidersButtonGroup {
  providers: Provider[];
  currentProviders: string;
}

const ProvidersButtonGroup = ({providers, currentProviders} : ProvidersButtonGroup) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const updateProvidersParams = (providersId: string[]) => {
    const params = new URLSearchParams(searchParams);

    if(providersId.length > 0) {
      const formattedProviders = providersId.join("|");
      params.set("providers", formattedProviders);
      params.set("page", "1");
    } else {
      params.delete("providers");
    }

    const newPathname = `${pathname}?${params.toString()}`;
    router.replace(newPathname);
  }

  let currentValues: string[] = [];
  if(currentProviders) { //re-format providers to an array for toggle group values.
    currentValues = currentProviders.split("|");
  }
  
  return (
  <ToggleGroup
    type="multiple"
    value={currentValues}
    onValueChange={(value) => updateProvidersParams(value)}
    className='providers-grid'
  >
    <TooltipProvider delayDuration={100}>
      {providers?.map((provider) => (
        <Tooltip key={provider.provider_id}>
          <TooltipTrigger asChild>
            <ToggleGroupItem
              value={provider.provider_id.toString()}
              className='w-[50px] h-[50px] relative'
            >
              <div className="provider-active">
                <Check className='!w-[32px] !h-[32px]' />
              </div>
              <Image
                src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                alt={provider.provider_name}
                width={50}
                height={50}
                className='rounded-[6px] max-w-[50px]'
              />
            </ToggleGroupItem>
          </TooltipTrigger>
          <TooltipContent>
            {provider.provider_name}
          </TooltipContent>
        </Tooltip>
      ))}
    </TooltipProvider>
  </ToggleGroup>

  )
}

export default ProvidersButtonGroup