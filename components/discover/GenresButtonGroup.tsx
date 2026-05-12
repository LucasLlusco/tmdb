"use client"
import React from 'react'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface GenresButtonGroupProps {
  genres: Genre[];
}

const GenresButtonGroup = ({genres} : GenresButtonGroupProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();  
  
  const selectedGenres = searchParams.get("genres");
  let selectedGenresArray: string[] = [];
  if(selectedGenres) {
    selectedGenresArray = selectedGenres.split(",");
  }

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

  return (
    <ToggleGroup
      value={selectedGenresArray}
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