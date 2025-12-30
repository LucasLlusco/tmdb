"use client"
import React from 'react'
import { deleteListDocument } from '@/lib/actions/user.actions'
import { useAuthContext } from '@/lib/providers/AuthContextProvider'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Trash } from 'lucide-react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface DeleteLisFormProps {
  list: ListType
}

const DeleteListForm = ({list}: DeleteLisFormProps) => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteListDocument(list.$id),
    onSuccess: () => {
      toast.success("List deleted successfully");
      queryClient.invalidateQueries({queryKey: ["lists", user?.userId]});
    },
    onError: () => {
      toast.error("Could not delete your list. Please try again");
    }
  });

  const handleDelete = () => {
    mutate();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="destructive">
          <Trash/>Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete List</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <span className='font-bold'>{list.title}</span>?
          </DialogDescription>
        </DialogHeader>
          <div className='flex gap-2 justify-end'>
            <DialogClose asChild>
              <Button variant="outline" disabled={isPending}>Cancel</Button>
            </DialogClose>
            <Button onClick={handleDelete} disabled={isPending}>Delete</Button>
          </div>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteListForm