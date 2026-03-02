"use client"
import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { SORT_OPTIONS } from '@/constants'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface SortProps {
  currentSort: string;
}

const Sort = ({currentSort} : SortProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

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
      <Select defaultValue={currentSort} value={currentSort} onValueChange={(value) => updateSortParams(value)}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem value={option.value} key={option.value}>{option.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default Sort