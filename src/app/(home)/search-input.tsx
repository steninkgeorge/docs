'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { useSearchParam } from "@/hooks/use-search-param";
import { SearchIcon, XIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { query } from "../../../convex/_generated/server";
import { api } from "../../../convex/_generated/api";
import { usePaginatedQuery } from "convex/react";
import { useDebounce } from "@/hooks/use-debounce";

export const SearchInput = () => {

    const inputref= useRef<HTMLInputElement>(null)
    const [search , setSearch ]= useSearchParam('search')
    const [value , setValue ]=useState(search)

    const debounce = useDebounce((search: string)=>{
          setSearch(search);
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value  
      setValue(v)
        debounce(v)
    }

    const handleClear = (e: any)=>{
        setValue('')
        debounce('')
        inputref.current?.blur()
    }


    return (
      <div className="flex-1 flex items-center justify-center">
        <form className="max-w-[720px] relative w-full" >
          <Input
          ref={inputref}
          value={value}
            onChange={handleChange}
            placeholder="search"
            className="md:text-base px-14 w-full  rounded-full focus-visible:ring-0 focus:bg-white bg-neutral-100"
          />
          <Button
            className="absolute hover:bg-transparent left-3 top-1/2 -translate-y-1/2"
            type="submit"
            variant={"ghost"}
            size={"icon"}
          >
            <SearchIcon />
          </Button>
          {value && (
            <Button
              className="absolute right-3 top-1/2 -translate-y-1/2 "
              type="submit"
              variant={"ghost"}
              size={"icon"}
              onClick={handleClear}
            >
              <XIcon />
            </Button>
          )}
        </form>
      </div>
    );
}