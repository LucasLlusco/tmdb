"use client"
import { getWatchlist } from '@/lib/actions/user.actions'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import AddWatchlistItemButton from './AddWatchlistItemButton'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Bookmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

interface AddWatchlistItemFormProps {
  userId: string;
  mediaId: number;
  mediaTitle: string;
  mediaType: "movie" | "tv";
  isInDropDown: boolean;
}

const AddWatchlistItemForm = ({userId, mediaId, mediaTitle, mediaType, isInDropDown}: AddWatchlistItemFormProps) => {
  const { data: watchlist, status } = useQuery({
    queryKey: ["watchlist", userId],
    queryFn: () => getWatchlist(userId),
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
          <p>Login to add this {mediaType === "movie" ? "movie" : "tv show"} to your watchlist</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )

  return (
    <>
    {status === "pending" && isInDropDown && (
      <DropdownMenuItem className="cursor-pointer" disabled={true}>
        <Bookmark className='w-4 h-4 mr-2' />
          Watchlist
      </DropdownMenuItem>       
    )}
    {status === "pending" && !isInDropDown && (
      <Button size={'icon'} className="rounded-full bg-slate-800" disabled={true}>
        <Bookmark />
      </Button>
    )}

    {status === "success" && (
      <AddWatchlistItemButton 
        userId={userId} 
        watchlist={watchlist} 
        mediaId={mediaId} 
        mediaTitle={mediaTitle} 
        mediaType={mediaType} 
        isInDropDown={isInDropDown}
      /> 
    )}
    </>
  )
}

export default AddWatchlistItemForm