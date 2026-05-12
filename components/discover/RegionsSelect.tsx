"use client"
import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface RegionsSelectProps {
  regions: Region[];
}

const RegionsSelect = ({regions} : RegionsSelectProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const selectedRegion = searchParams.get("region") || "AR"; //default AR

  const updateRegionParams = (region: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("region", region); //region update only
    params.set("page", "1"); //reset page to 1
    params.delete("providers"); //reset selected providers

    const newPathname = `${pathname}?${params.toString()}`;
    router.replace(newPathname);
  }

  return (
    <Select
      defaultValue={selectedRegion}
      value={selectedRegion} 
      onValueChange={(value) => updateRegionParams(value)}
      >
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {regions?.map((region) => (
          <SelectItem 
            value={region.iso_3166_1} 
            key={region.iso_3166_1}
            className="cursor-pointer"
            >
              {region.english_name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default RegionsSelect