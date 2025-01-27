"use client"
import React from 'react'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'

interface FilterOption {
  name: string,
  value: string
}

interface FiltersProps {
  filters: FilterOption[],
  onClick: (value:string) => void,
  defaultValue: string
}

const Filters = ({filters, onClick, defaultValue}: FiltersProps) => {

  const handleFetchData = (value:string) => {
    onClick(value);
  }

  return (
    <Tabs defaultValue={defaultValue} className='mb-6'>
      <TabsList>
        {filters.map((filter:FilterOption) => (
          <TabsTrigger 
            key={filter.value} 
            value={filter.value} 
            onClick={() => handleFetchData(filter.value)}
          >
            <span>{filter.name}</span>          
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

export default Filters