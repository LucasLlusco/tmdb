"use client"
import React from 'react'
import { deleteList } from '@/lib/actions/user.actions'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Trash } from 'lucide-react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { deleteListFormSchema } from '@/lib/schemas/user.schema'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'

interface DeleteLisFormProps {
  list: ListDocument;
}

const DeleteListForm = ({list}: DeleteLisFormProps) => {
  const formSchema = deleteListFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirm: false
    }
  })

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteList(list.$id),
    onSuccess: () => {
      toast.success("List deleted successfully");
      queryClient.invalidateQueries({queryKey: ["lists", list.userId]});
    },
    onError: () => {
      toast.error("Could not delete your list. Please try again");
    }
  });

  const onSubmit = async (data:z.infer<typeof formSchema>) => {
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
          <DialogDescription className='space-y-3'>
            <p>Are you sure you want to delete <span className='font-bold'>{list.title}</span>?</p>
            <p className='font-bold'>This action is irreversible.</p>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem className="text-left flex flex-row flex-wrap items-center">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className='!mt-0 ml-3'>I understand and confirm the action</FormLabel>   
                  <FormMessage className='w-full' />  
                </FormItem>
              )}
            />
            <div className='flex gap-2 justify-end'>
              <DialogClose asChild>
                <Button variant="outline" disabled={isPending}>Cancel</Button>
              </DialogClose>
              <Button type='submit' disabled={isPending || form.getValues("confirm") === false}>Delete</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteListForm