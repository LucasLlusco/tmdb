"use client"
import React from 'react'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface GenresButtonGroupProps {
  genres: Genre[];
  currentGenres: string;
}

const GenresButtonGroup = ({genres, currentGenres} : GenresButtonGroupProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();  

  const updateGenresParams = (genres: string[]) => {
    const params = new URLSearchParams(searchParams);

    if(genres.length > 0) {
      const formattedGenres = genres.join(",");
      params.set("genres", formattedGenres);
      params.set("page", "1");
    } else {
      params.delete("genres");
    }

    const newPathname = `${pathname}?${params.toString()}`;
    router.replace(newPathname);
  }

  let currentValues: string[] = [];
  if(currentGenres) {
    currentValues = currentGenres.split(",");
  }

  return (
    <ToggleGroup
      value={currentValues}
      type="multiple" 
      onValueChange={(value) => updateGenresParams(value)} 
      className='flex flex-wrap gap-[5px] justify-start'
      >
      {genres?.map((genre) => (
        <ToggleGroupItem 
          key={genre.id}
          value={genre.id.toString()} 
          className='p-[10px]'
          >
            {genre.name}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

export default GenresButtonGroup