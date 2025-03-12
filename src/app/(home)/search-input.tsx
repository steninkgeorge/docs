'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { useSearchParam } from "@/hooks/use-search-param";
import { SearchIcon, XIcon } from "lucide-react";
import React, { useRef, useState } from "react";

export const SearchInput = () => {

    const inputref= useRef<HTMLInputElement>(null)
    const [search , setSearch ]= useSearchParam('search')
    const [value , setValue ]=useState(search)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const handleClear = (e: any)=>{
        setValue('')
        setSearch("")
        inputref.current?.blur()
    }

    const handleSubmit= (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setSearch(value)
        inputref.current?.blur()    
    }

    return (
      <div className="flex-1 flex items-center justify-center">
        <form className="max-w-[720px] relative w-full" onSubmit={handleSubmit}>
          <Input
          value={value}
            onChange={handleChange}
            placeholder="search"
            className="md:text-base px-14 w-full  rounded-full focus-visible:ring-0 focus:bg-white bg-neutral-100"
          />
          <Button
            className="absolute left-3 top-1/2 -translate-y-1/2"
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