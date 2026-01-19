"use client"
import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { updateWatchlistDocument } from '@/lib/actions/user.actions'
import { isItemInList } from '@/lib/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

interface AddWatchlistButtonProps {
  userId: string
  watchlist: WatchlistType
  itemId: number
  itemTitle: string
  itemType: "movie" | "tv"
  isInDropDown: boolean
}

interface AddWatchlistItemPayload {
  items: number[]
  itemsMediaType: ("movie" | "tv")[]
  action: "add" | "delete"
}

const AddWatchlistItemButton = ({userId, watchlist, itemId, itemTitle, itemType, isInDropDown} : AddWatchlistButtonProps) => {

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({items, itemsMediaType, action} : AddWatchlistItemPayload) => updateWatchlistDocument(watchlist.$id, {items, itemsMediaType}),
    onSuccess: (data, variables) => {
      if(variables.action === "add") {
        toast.success(`${itemTitle} was added to watchlist successfully`);
      } else {
        toast.success(`${itemTitle} was removed from watchlist successfully`);
      }
      queryClient.invalidateQueries({queryKey: ["watchlist", userId]});
    },
    onError: (data, variables) => {
      if(variables.action === "add") {
        toast.error(`Could not add ${itemTitle} to watchlist. Please try again`);
      } else {
        toast.error(`Could not remove ${itemTitle} from watchlist. Please try again`);
      }
    }
  });

  const handleAddItem = () => {
    const newItems = watchlist.items;
    const newItemsMediaType = watchlist.itemsMediaType;    
    const { index, isInIt } = isItemInList(itemId, itemType, newItems, newItemsMediaType);
    let action: "add" | "delete";

    if(isInIt) {
      newItems.splice(index, 1);
      newItemsMediaType.splice(index, 1);
      action = "delete";
    } else {
      newItems.push(itemId);
      newItemsMediaType.push(itemType);
      action = "add";
    }

    mutate({
      items: newItems,
      itemsMediaType: newItemsMediaType,
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
        {isItemInList(itemId, itemType, watchlist.items, watchlist.itemsMediaType).isInIt ? 
        <BookmarkCheck className='w-4 h-4 mr-2' /> : <Bookmark className='w-4 h-4 mr-2' />}
        Watchlist
      </DropdownMenuItem>
    ) : (
      <Button size="icon" className='rounded-full' onClick={handleAddItem} disabled={isPending}>
        {isItemInList(itemId, itemType, watchlist.items, watchlist.itemsMediaType).isInIt ? <BookmarkCheck /> : <Bookmark />}
      </Button>
    )}
    </>
  )
}

export default AddWatchlistItemButton