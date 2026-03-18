"use client"
import { Button } from '@/components/ui/button'
import { updateList } from '@/lib/actions/user.actions'
import { isItemInList } from '@/lib/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CrossIcon, ListCheck } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

interface AddListItemButtonProps {
  userId: string;
  list: ListDocument;
  mediaId: number;
  mediaTitle: string;
  mediaType: "movie" | "tv";
}

interface AddListItemPayload {
  mediaIds: number[];
  mediaTypes: ("movie" | "tv")[];
  action: "add" | "delete";
}

const AddListItemButton = ({userId, list, mediaId, mediaTitle, mediaType}: AddListItemButtonProps) => {
  const queryClient = useQueryClient();
  const { index, isInIt } = isItemInList(mediaId, mediaType, list.mediaIds, list.mediaTypes);

  const { mutate, isPending } = useMutation({
    mutationFn: ({mediaIds, mediaTypes, action} : AddListItemPayload) => updateList(list.$id, {mediaIds, mediaTypes}),
    onSuccess: (data, variables) => {
      if(variables.action === "add") {
        toast.success(`${mediaTitle} was added to ${list.title} successfully`);
      } else {
        toast.success(`${mediaTitle} was removed from ${list.title} successfully`);
      }
      queryClient.invalidateQueries({queryKey: ["lists", userId]}); 
      queryClient.invalidateQueries({queryKey: ["list", list.$id]}); 
    },
    onError: (data, variables) => {
      if(variables.action === "add") {
        toast.error(`Could not add ${mediaTitle} to ${list.title}. Please try again`);
      } else {
        toast.error(`Could not remove ${mediaTitle} from ${list.title}. Please try again`);
      }
    }
  });

  //toggle add/remove
  const handleAddItem = () => {
    const newMediaIds = list.mediaIds!;
    const newMediaTypes = list.mediaTypes!;
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