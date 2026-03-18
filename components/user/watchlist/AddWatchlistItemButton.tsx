"use client"
import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { updateWatchlist } from '@/lib/actions/user.actions'
import { isItemInList } from '@/lib/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

interface AddWatchlistButtonProps {
  userId: string;
  watchlist: WatchlistDocument;
  mediaId: number;
  mediaTitle: string;
  mediaType: "movie" | "tv";
  isInDropDown: boolean;
}

interface AddWatchlistItemPayload {
  mediaIds: number[];
  mediaTypes: ("movie" | "tv")[];
  action: "add" | "delete";
}

const AddWatchlistItemButton = ({userId, watchlist, mediaId, mediaTitle, mediaType, isInDropDown} : AddWatchlistButtonProps) => {
  const queryClient = useQueryClient();
  const { index, isInIt } = isItemInList(mediaId, mediaType, watchlist.mediaIds, watchlist.mediaTypes);
  
  const { mutate, isPending } = useMutation({
    mutationFn: ({mediaIds, mediaTypes, action} : AddWatchlistItemPayload) => updateWatchlist(watchlist.$id, {mediaIds, mediaTypes}),
    onSuccess: (data, variables) => {
      if(variables.action === "add") {
        toast.success(`${mediaTitle} was added to watchlist successfully`);
      } else {
        toast.success(`${mediaTitle} was removed from watchlist successfully`);
      }
      queryClient.invalidateQueries({queryKey: ["watchlist", userId]});
    },
    onError: (data, variables) => {
      if(variables.action === "add") {
        toast.error(`Could not add ${mediaTitle} to watchlist. Please try again`);
      } else {
        toast.error(`Could not remove ${mediaTitle} from watchlist. Please try again`);
      }
    }
  });

  const handleAddItem = () => {
    const newMediaIds = watchlist.mediaIds;
    const newMediaTypes = watchlist.mediaTypes;    
    let action: "add" | "delete";

    if(isInIt) {
      newMediaIds.splice(index, 1);
      newMediaTypes.splice(index, 1);
      action = "delete";
    } else {
      newMediaIds.push(mediaId);
      newMediaTypes.push(mediaType);
      action = "add";
    }

    mutate({
      mediaIds: newMediaIds,
      mediaTypes: newMediaTypes,
      action: action
    });
  }

  return (
    <>
    {isInDropDown ? (
      <DropdownMenuItem 
        className="cursor-pointer"
        disabled={isPending}
        onSelect={(event) => {
          event.preventDefault(); //prevent menu close
          handleAddItem();
        }}
      >
        {isInIt ? <BookmarkCheck className='w-4 h-4 mr-2' /> : <Bookmark className='w-4 h-4 mr-2' />}
        Watchlist
      </DropdownMenuItem>
    ) : (
      <Button size={'icon'} className="rounded-full bg-slate-800" onClick={handleAddItem} disabled={isPending}>
        {isInIt ? <BookmarkCheck /> : <Bookmark />}        
      </Button>
    )}
    </>
  )
}

export default AddWatchlistItemButton