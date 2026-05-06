"use client"
import React from 'react'
import ToggleListItemForm from '../user/lists/ToggleListItemForm';
import ToggleWatchlistItemForm from '../user/watchlist/ToggleWatchlistItemForm';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Button } from '../ui/button';
import { Heart } from 'lucide-react';
import { useAuthContext } from '@/lib/providers/AuthContextProvider';

interface MediaToggleButtonsProps {
  mediaId: number;
  mediaTitle: string;
  mediaType: "movie" | "tv";
}

const MediaToggleButtons = ({mediaId, mediaTitle, mediaType} : MediaToggleButtonsProps) => {
  const { user } = useAuthContext();

  return (
    <div className="flex flex-row gap-2 items-center">
      <ToggleListItemForm userId={user?.$id!} mediaId={mediaId} mediaTitle={mediaTitle} mediaType={mediaType} isInDropDown={false} />
      <ToggleWatchlistItemForm userId={user?.$id!} mediaId={mediaId} mediaTitle={mediaTitle} mediaType={mediaType} isInDropDown={false} />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className='rounded-full bg-slate-800' size={'icon'}>
              <Heart />
            </Button>                  
          </TooltipTrigger>
          <TooltipContent>
            <p>Mark as favorite</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>   
  )
}

export default MediaToggleButtons