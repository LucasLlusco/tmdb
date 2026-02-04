"use client"
import { getWatchlistDocument } from '@/lib/actions/user.actions'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import AddWatchlistItemButton from './AddWatchlistItemButton'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Bookmark } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AddWatchlistItemFormProps {
  userId: string
  itemId: number
  itemTitle: string
  itemType: "movie" | "tv"
  isInDropDown: boolean
}

const AddWatchlistItemForm = ({userId, itemId, itemTitle, itemType, isInDropDown}: AddWatchlistItemFormProps) => {
  const { data: watchlist, status } = useQuery({
    queryKey: ["watchlist", userId],
    queryFn: () => getWatchlistDocument(userId),
    enabled: !!userId
  });

  if (status === "error") return <p>Error loading watchlist</p>;
  if(!userId && !isInDropDown) return ( //mediaCard.tsx handle this for isInDropdown case.
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size={'icon'} className="rounded-full bg-slate-800">
            <Bookmark />
          </Button>                 
        </TooltipTrigger>
        <TooltipContent>
          <p>Login to add this {itemType === "movie" ? "movie" : "tv show"} to your watchlist</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )

  return (
    <AddWatchlistItemButton 
      userId={userId} 
      watchlist={watchlist!} 
      itemId={itemId} 
      itemTitle={itemTitle} 
      itemType={itemType} 
      isInDropDown={isInDropDown}
      isWatchlistPending={status === "pending"}
    />
  )
}

export default AddWatchlistItemForm