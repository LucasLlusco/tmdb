"use client"
import React, { useEffect, useRef, useState } from 'react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getSearchedItems } from '@/services/tmdb/shared';
import { Spinner } from '../ui/spinner';
import SearchResultCard from './SearchResultCard';

const SearchBar = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(""); //search value that user types
  const [searchDebouncedValue, setSearchDebouncedValue] = useState(""); //actual search value that will be send to getSearchedItems()
  const searchRef = useRef<HTMLDivElement>(null);

  const formattedParams = { 
    query: searchDebouncedValue,
    page: 1
  }

  //close searchbar when click outside of it
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //update state debouncedValue after 400ms user stop typing.
  useEffect(() => {
    if(!searchValue.trim()) {
      setSearchDebouncedValue("");
      return;
    }

    const timer = setTimeout(() => setSearchDebouncedValue(searchValue), 400);
    return () => clearTimeout(timer);
  }, [searchValue]);

  //fetch the searched items only when there is something on debouncedValue
  const { data, isLoading } = useQuery({
    queryKey: ["keywords", searchDebouncedValue],
    queryFn: () => getSearchedItems("multi", formattedParams),
    enabled: searchDebouncedValue.length > 1,
    staleTime: 1000 * 60 * 5,
  });

  //navigate to search page when user press enter
  const handleEnter = () => {
    if(!searchValue.trim()) return;
    setOpen(false);
    router.push(`/search/movie?query=${searchValue.trim()}`);
  }

  return (
    <div ref={searchRef} className="w-full"> 
      <Command shouldFilter={false} className="rounded-lg border relative overflow-visible md:max-w-md">
        <CommandInput
          placeholder="Search for a movie or tv show..."
          className="pl-1 outline-none bg-transparent"
          onValueChange={(values) => {
            setOpen(true);
            setSearchValue(values);
          }}
          onKeyDown={(e) => {
            if(e.key === "Enter") handleEnter();
          }}
          onClick={() => setOpen(true)}
        />
        {open && searchDebouncedValue && (
          <CommandList className='absolute z-50 w-full self-stretch top-10 bg-white card-boxshadow rounded-lg'>
            {isLoading ? <div className="flex justify-center pt-2"><Spinner /></div> : <CommandEmpty>No results found</CommandEmpty>}
            <CommandGroup>
              {data?.results.slice(0, 8).map((mediaItem) => {
                if(mediaItem.media_type === "movie" || mediaItem.media_type === "tv") return (
                  <SearchResultCard key={mediaItem.id} item={mediaItem} setOpen={setOpen} />
                )
              })}
            </CommandGroup>
            <CommandSeparator />
          </CommandList>        
        )}
      </Command>
    </div>
  )
}

export default SearchBar