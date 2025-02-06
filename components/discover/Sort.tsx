"use client"
import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { SORT_OPTIONS } from '@/constants'

interface SortProps {
  filters: DiscoverFiltersType,
  setFilters: React.Dispatch<React.SetStateAction<DiscoverFiltersType>>
}

const Sort = ({filters, setFilters}: SortProps) => {

  const handleSelectedSort = (value:string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      selectedSort: value
    }))
  }

  return (
    <Accordion type="single" collapsible className="aside-box card-boxshadow">
      <AccordionItem value="item-1" className='border-b-0'>
        <AccordionTrigger className='border-b mb-4'>Sort results by</AccordionTrigger>
        <AccordionContent>
          <Select defaultValue={filters.selectedSort} value={filters.selectedSort} onValueChange={(value) => handleSelectedSort(value)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem value={option.value} key={option.value}>{option.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default Sort