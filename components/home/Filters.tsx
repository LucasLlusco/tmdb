"use client"
import React from 'react'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'

interface FilterOption {
  name: string,
  value: string
}

interface FiltersProps {
  filters: FilterOption[],
  defaultValue: string,
  setFilter: React.Dispatch<React.SetStateAction<string>> 
}

const Filters = ({filters, defaultValue, setFilter}: FiltersProps) => {

  return (
    <Tabs defaultValue={defaultValue} className='mb-6'>
      <TabsList>
        {filters.map((filter:FilterOption) => (
          <TabsTrigger 
            key={filter.value} 
            value={filter.value} 
            onClick={() => setFilter(filter.value)}
          >
            <span>{filter.name}</span>          
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

export default Filters