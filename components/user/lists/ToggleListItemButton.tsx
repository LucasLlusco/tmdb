"use client"
import { Button } from '@/components/ui/button'
import { updateList } from '@/lib/actions/user.actions'
import { isItemInList } from '@/lib/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CrossIcon, ListCheck } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

interface ToggleListItemButtonProps {
  userId: string;
  list: ListDocument;
  mediaId: number;
  mediaTitle: string;
  mediaType: "movie" | "tv";
}

interface ToggleListItemPayload {
  mediaIds: number[];
  mediaTypes: ("movie" | "tv")[];
  action: "add" | "delete";
}

const ToggleListItemButton = ({userId, list, mediaId, mediaTitle, mediaType}: ToggleListItemButtonProps) => {
  const queryClient = useQueryClient();
  const { index, isInIt } = isItemInList(mediaId, mediaType, list.mediaIds, list.mediaTypes);

  const { mutate, isPending } = useMutation({
    mutationFn: ({mediaIds, mediaTypes, action, } : ToggleListItemPayload) => updateList(list.$id, {mediaIds, mediaTypes}),
    onMutate: async ({mediaIds, mediaTypes}) => { //optimistic update for both, listDocuments[] and listDocument
      await Promise.all([
        queryClient.cancelQueries({ queryKey: ["lists", userId]}),
        queryClient.cancelQueries({ queryKey: ["list", list.$id]})
      ]);
     
      const previousLists = queryClient.getQueryData(["lists", userId]);
      const previousList = queryClient.getQueryData(["list", list.$id]);

      if(previousLists) {
        queryClient.setQueryData(["lists", userId], (old: ListDocument[]) =>
          old.map((l) => {
            if (l.$id !== list.$id) return l;

            return {
              ...l,
              mediaIds: mediaIds,
              mediaTypes: mediaTypes
            };
          })
        );
      }

      if(previousList) {
        queryClient.setQueryData(["list", list.$id], (old: ListDocument) => {
          return {
            ...old,
            mediaIds: mediaIds,
            mediaTypes: mediaTypes      
          };
        })
      }

      return { previousLists, previousList };
    },
    onSuccess: (_, { action }) => {
      if(action === "add") {
        toast.success(`${mediaTitle} was added to ${list.title} successfully`);
      } else {
        toast.success(`${mediaTitle} was removed from ${list.title} successfully`);
      }
      queryClient.invalidateQueries({queryKey: ["lists", userId]}); 
      queryClient.invalidateQueries({queryKey: ["list", list.$id]}); 
    },
    onError: (_, { action }, context) => {
      if(action === "add") {
        toast.error(`Could not add ${mediaTitle} to ${list.title}. Please try again`);
      } else {
        toast.error(`Could not remove ${mediaTitle} from ${list.title}. Please try again`);
      }

      if(context?.previousLists) {
        queryClient.setQueryData(["lists", userId], context.previousLists);
      }

      if(context?.previousList) {
        queryClient.setQueryData(["lists", userId], context.previousList);
      }
    }
  });

  const handleToggle = () => {
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
      onClick={() => handleToggle()}
      className="justify-start"
      disabled={isPending}
    >
      {isInIt ? <ListCheck  /> : <CrossIcon />}
      {list.title}
    </Button>
  )
}

export default ToggleListItemButton