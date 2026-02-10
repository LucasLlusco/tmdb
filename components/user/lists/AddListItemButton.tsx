"use client"
import { Button } from '@/components/ui/button'
import { updateListDocument } from '@/lib/actions/user.actions'
import { isItemInList } from '@/lib/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CrossIcon, ListCheck } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

interface AddListItemButtonProps {
  userId: string
  list: ListType
  itemId: number
  itemTitle: string
  itemType: "movie" | "tv"
}

interface AddListItemPayload {
  items: number[],
  itemsMediaType: ("movie" | "tv")[],
  action: "add" | "delete",
}

const AddListItemButton = ({userId, list, itemId, itemTitle, itemType}: AddListItemButtonProps) => {
  const queryClient = useQueryClient();
  const { index, isInIt } = isItemInList(itemId, itemType, list.items, list.itemsMediaType);

  const { mutate, isPending } = useMutation({
    mutationFn: ({items, itemsMediaType, action} : AddListItemPayload) => updateListDocument(list.$id, {items, itemsMediaType}),
    onSuccess: (data, variables) => {
      if(variables.action === "add") {
        toast.success(`${itemTitle} was added to ${list.title} successfully`);
      } else {
        toast.success(`${itemTitle} was removed from ${list.title} successfully`);
      }
      queryClient.invalidateQueries({queryKey: ["lists", userId]}); 
      queryClient.invalidateQueries({queryKey: ["list", list.$id]}); 
    },
    onError: (data, variables) => {
      if(variables.action === "add") {
        toast.error(`Could not add ${itemTitle} to ${list.title}. Please try again`);
      } else {
        toast.error(`Could not remove ${itemTitle} from ${list.title}. Please try again`);
      }
    }
  });

  //toggle add/remove
  const handleAddItem = () => {
    const newItems = list.items!;
    const newItemsMediaType = list.itemsMediaType!;
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
    <Button
      variant="outline" 
      onClick={() => handleAddItem()}
      className="justify-start"
      disabled={isPending}
    >
      {isInIt ? <ListCheck  /> : <CrossIcon />}
      {list.title}
    </Button>
  )
}

export default AddListItemButton