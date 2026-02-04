"use client"
import React from 'react'
import { getListDocuments } from '@/lib/actions/user.actions'
import { useQuery } from '@tanstack/react-query'
import { Button } from '../../ui/button'
import { List } from 'lucide-react'
import CreateListForm from './CreateListForm'
import AddListItemButton from './AddListItemButton'
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface AddListItemFormProps {
  userId: string 
  itemId: number
  itemTitle: string
  itemType: "movie" | "tv"
  isInDropDown: boolean 
}

const AddListItemForm = ({userId, itemId, itemTitle, itemType, isInDropDown}: AddListItemFormProps) => {
  const { data, status } = useQuery({
    queryKey: ["lists", userId],
    queryFn: () => getListDocuments(userId!),
    enabled: !!userId // Only run query when userId exists
  });

  if (status === "error") return <p>Error loading lists</p>;
  if (!userId && !isInDropDown) return ( //mediaCard.tsx handle this for isInDropdown case.
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size={'icon'} className="rounded-full bg-slate-800">
            <List />
          </Button>                 
        </TooltipTrigger>
        <TooltipContent>
          <p>Login to create and edit custom lists</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
  
  return (
    <>
    {isInDropDown ? (
      <>
      {status === "pending" ? <p>Loading lists...</p> : (
        <div className="flex flex-col gap-[10px] w-80 p-3">
          <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-[6px]">
            <h4 className='text-lg font-semibold leading-none tracking-tight'>Add to List</h4>
            <p className='text-sm text-muted-foreground'>Add or remove <span className='font-bold'>{itemTitle}</span> from one of your lists.</p>
          </div>
          <CreateListForm userId={userId} />
          {data?.map((list) => (
            <AddListItemButton 
              key={list.$id} 
              userId={userId} 
              list={list} 
              itemId={itemId}
              itemTitle={itemTitle}
              itemType={itemType}
            />         
          ))}
        </div>
      )}
      </>
    ) : (
      <Popover>
        <PopoverTrigger asChild>
          <Button size={'icon'} className="rounded-full bg-slate-800" disabled={status === "pending"}>
            <List />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-[10px] w-80 p-3">
          <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-[6px]">
            <h4 className='text-lg font-semibold leading-none tracking-tight'>Add to List</h4>
            <p className='text-sm text-muted-foreground'>Add or remove <span className='font-bold'>{itemTitle}</span> from one of your lists.</p>
          </div>
          <CreateListForm userId={userId} />
          {data?.map((list) => (
            <AddListItemButton 
              key={list.$id} 
              userId={userId} 
              list={list} 
              itemId={itemId}
              itemTitle={itemTitle}
              itemType={itemType}
            />         
          ))}          
        </PopoverContent>
      </Popover>
    )}
    </>
  )
}

export default AddListItemForm