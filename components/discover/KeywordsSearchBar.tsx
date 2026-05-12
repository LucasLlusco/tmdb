"use client"
import React, { useEffect, useState } from 'react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getSearchedKeywords } from '@/services/tmdb/shared';
import { Badge } from '../ui/badge';
import { X } from 'lucide-react';
import { Spinner } from '../ui/spinner';

const KeywordsSearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(""); 
  const [searchDebouncedValue, setSearchDebouncedValue] = useState(""); 

  const selectedKeywords: Keyword[] = JSON.parse(
    searchParams.get("keywords") ?? "[]"
  );

  useEffect(() => {
    if(!searchValue.trim()) {
      setSearchDebouncedValue("");
      return;
    }

    const timer = setTimeout(() => setSearchDebouncedValue(searchValue), 400);
    return () => clearTimeout(timer);
  }, [searchValue]);

  const { data: results = [], isLoading } = useQuery({
    queryKey: ["keywords", searchDebouncedValue],
    queryFn: () => getSearchedKeywords(searchDebouncedValue),
    enabled: searchDebouncedValue.length > 1,
    staleTime: 1000 * 60 * 5,
  });

  const handleSelect = (keyword: Keyword) => {
    const alreadySelected = selectedKeywords.some((k) => k.id === keyword.id);
    if(alreadySelected) return;

    const updated = [...selectedKeywords, keyword];

    const params = new URLSearchParams(searchParams.toString());
    params.set("keywords", JSON.stringify(updated));
    params.set("page", "1");

    const newPathname = `${pathname}?${params.toString()}`;
    router.replace(newPathname);

    setSearchValue("");
    setSearchDebouncedValue("");
    setOpen(false);
  }

  const handleRemove = (keywordId: number) => {
    const updated = selectedKeywords.filter((k) => k.id !== keywordId);
    const params = new URLSearchParams(searchParams.toString());

    if(updated.length > 0) {
      params.set("keywords", JSON.stringify(updated));
    } else {
      params.delete("keywords");
    }
    params.set("page", "1");

    const newPathname = `${pathname}?${params.toString()}`;
    router.replace(newPathname);
  }

  return (
    <>
    <div>
      <p className='mb-4'>Keywords</p>
      <Command shouldFilter={false} className="max-w-sm rounded-lg border">
        <CommandInput
          placeholder="Search keywords..."
          className="pl-1 outline-none bg-transparent"
          onValueChange={(values) => {
            setOpen(true);
            setSearchValue(values);
          }}
        />
        {open && searchDebouncedValue && (
          <CommandList>
            {isLoading ? <div className="flex justify-center pt-2"><Spinner /></div> : <CommandEmpty>No results found</CommandEmpty>}
            <CommandGroup>
              {results.map((keyword) => (
                <CommandItem
                  key={keyword.id}
                  value={keyword.name}
                  onSelect={() => handleSelect(keyword)}
                  className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                  >
                  {keyword.name}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </CommandList>        
        )}
      </Command>

      <div className="flex flex-wrap gap-[5px] justify-start mt-[20px]">
        {selectedKeywords.map((keyword, index) => (
          <Badge key={index} variant={"secondary"}>
            {keyword.name}
            <button onClick={() => handleRemove(keyword.id)}>
              <X className="ml-1 h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
    </>
  )
}

export default KeywordsSearchBar