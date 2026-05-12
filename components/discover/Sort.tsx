"use client"
import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { SORT_OPTIONS } from '@/constants'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const Sort = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const selectedSort = searchParams.get("sort") || SORT_OPTIONS[1].value;

  const updateSortParams = (value:string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    params.set("page", "1");

    const newPathname = `${pathname}?${params.toString()}`;
    router.replace(newPathname);
  }

  return (
    <div>
      <p className='mb-4'>Sort results by</p>
      <Select defaultValue={selectedSort} value={selectedSort} onValueChange={(value) => updateSortParams(value)}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem 
              value={option.value} 
              key={option.value}
              className="cursor-pointer"
              >
                {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default Sort