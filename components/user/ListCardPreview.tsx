"use client"
import { updateListDocument } from '@/lib/actions/user.actions'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CrossIcon, ListCheck } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'

interface ListCardPreviewProps {
  userId: string,
  list: ListType,
  itemId: number,
  itemTitle: string,
  itemType: "movie" | "tv",
}

interface AddListItemPayload {
  items: number[],
  itemsMediaType: ("movie" | "tv")[],
  action: "add" | "delete"
}

const ListCardPreview = ({userId, list, itemId, itemTitle, itemType}: ListCardPreviewProps) => {

  const isItemInList = (items: number[], itemsMediaType: ("movie" | "tv")[]) => {
    const index = items.findIndex(item => item == itemId); 

    const item = items[index];
    const type = itemsMediaType[index];

    if(item == itemId && type == itemType) {
      return {
        isInIt: true,
        index: index
      }
    } else {
      return {
        isInIt: false,
        index: -1
      }
    }
  }

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({items, itemsMediaType, action} : AddListItemPayload) => updateListDocument(list.$id, {items, itemsMediaType}),
    onSuccess: (data, variables) => {
      if(variables.action === "add") {
        toast.success(`${itemTitle} was added to ${list.title} successfully`);
      } else {
        toast.success(`${itemTitle} was removed from ${list.title} successfully`);
      }
      
      queryClient.invalidateQueries({queryKey: ["lists", userId]});
    },
    onError: (data, variables) => {
      if(variables.action === "add") {
        toast.error(`Could not add ${itemTitle} to ${list.title}. Please try again`);
      } else {
        toast.error(`Could not remove ${itemTitle} from ${list.title}. Please try again`);
      }
    }
  });

  const handleAddItem = () => {
    const newItems = list.items!;
    const newItemsMediaType = list.itemsMediaType!;
    let action: "add" | "delete";

    if(isItemInList(newItems, newItemsMediaType).isInIt) {
      const index = isItemInList(newItems, newItemsMediaType).index;
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
    <Button 
      variant="outline" 
      onClick={() => handleAddItem()}
      className="justify-start"
      disabled={isPending}
    >
      {isItemInList(list.items!, list.itemsMediaType!).isInIt ? <ListCheck  /> : <CrossIcon />}
      {list.title}
    </Button>
  )
}

export default ListCardPreview