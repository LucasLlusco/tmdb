"use client"
import { Form, FormControl } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { updateWatchlistDocument } from '@/lib/actions/user.actions';
import { editWatchlistFormSchema } from '@/lib/schemas/user.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface EditWatchlistFormProps {
  watchlist: WatchlistType
  userId: string
}

const EditWatchlistForm = ({watchlist, userId} : EditWatchlistFormProps) => {
  const formSchema = editWatchlistFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      privacy: watchlist.isPublic
    },
  })

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (isPublic:boolean) => updateWatchlistDocument(watchlist.$id, {
      isPublic: isPublic
    }),
    onSuccess: () => {
      toast.success("Watchlist updated successfully");
      queryClient.invalidateQueries({queryKey: ["watchlist", userId]});
    },
    onError: () => {
      toast.error("Could not update your watchlist. Please try again");
    }
  });

  const onSubmit = async (data:z.infer<typeof formSchema>) => {
    mutate(data.privacy);
  } 

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-6 flex flex-row items-center gap-3">
        <p>Public</p>
        <Controller
          name='privacy'
          control={form.control}
          render={({field, fieldState}) => (
          <FormControl>
            <Switch
              onCheckedChange={(checked) => {
                field.onChange(checked);
                form.handleSubmit(onSubmit)(); //trigger the submit function
              }}
              checked={field.value}
              disabled={isPending}
              name={field.name}
            />
          </FormControl>
        )}
        >
        </Controller>
        <p>{form.getValues().privacy ? "On" : "Off"}</p>      
      </form>
    </Form>
  )
}

export default EditWatchlistForm