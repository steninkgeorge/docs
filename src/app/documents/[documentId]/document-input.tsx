'use client'

import { BsCloudCheck, BsCloudSlash } from "react-icons/bs";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import React, { useEffect, useRef, useState } from "react";
import { NavbarProps } from "./navbar";
import { useDebounce } from "@/hooks/use-debounce";
import { toast } from "sonner";
import { useStatus } from "@liveblocks/react";
import { Loader2Icon } from "lucide-react";

export const DocumentInput = ({ id, title }: NavbarProps) => {
  const mutate = useMutation(api.document.renameDocument);
  const [input, setInput] = useState(title);
  const [isEditing, setEditing] = useState(false);
  const [isPending, setPending] = useState(false);
const status = useStatus()
  const inpRef = useRef<HTMLInputElement>(null);
  const showError = status ==='disconnected'
  const showLoader = status==='connecting' || status==='reconnecting' || isPending

  const debouncedUpdate = useDebounce((newValue: string) => {
    if (newValue === title) {
      return;
    }

    setPending(true);
    mutate({ id: id, title: newValue })
      .then(() => toast.success("file rename successful"))
      .catch(() => toast.error("file rename failed"))
      .finally(() => setPending(false));
  },1500);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInput(newValue);
    debouncedUpdate(newValue);
  };

  const handelSubmit = ((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setPending(true);
    mutate({ id: id, title: input })
      .then(() => { 
        toast.success("file rename successful")
      setEditing(false)})
      .catch(() => toast.error("file rename failed"))
      .finally(() => setPending(false));
  });

  useEffect(() => {
    setInput(title);
  }, [title]);


  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <form onSubmit={handelSubmit} className="w-fit relative max-w-[50ch]">
          <span className="invisible whitespace-pre px-1.5 text-lg dark:text-gray-200">
            {input || ""}
          </span>
          <input
            ref={inpRef}
            onBlur={() => setEditing(false)}
            value={input}
            onChange={onChange}
            className="absolute inset-0 px-1.5 truncate bg-transparent text-black dark:text-gray-200 text-lg"
          />
        </form>
      ) : (
        <span
          onClick={() => {
            setEditing(true);
            setTimeout(() => {
              inpRef.current?.focus();
            }, 0);
          }}
          className="text-lg truncate cursor-pointer px-1.5 dark:text-gray-200"
        >
          {title}
        </span>
      )}

     {!showError && !showLoader && <BsCloudCheck className="dark:text-gray-300"/>}
     {showError && <BsCloudSlash className="dark:text-gray-300"/>}
     {showLoader && <Loader2Icon className="size-4 animate-spin dark:text-gray-300"/>}
    </div>
  );
};
