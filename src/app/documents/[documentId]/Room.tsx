"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { getUsers } from "./action";
import { toast } from "sonner";
import { FullScreenLoader } from "@/components/full-screen-loader";

type User={
id: string , name : string , avatar: string
}

export function Room({ children }: { children: ReactNode }) {
  const params = useParams()
  const [users , setUsers]=useState<User[]>([])

const fetchUser =useMemo(  () => async ()=>{
  try {
    const users = await getUsers();
    setUsers(users);
  } catch (error) {
    toast.error('failed to fetch');
  }
},[])

useEffect(()=>{
  fetchUser()
},[fetchUser])

  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      throttle={16}
      resolveUsers={async ({ userIds }) => {
        
        return userIds.map((userId)=>
          users.find((user)=>
            user.id=== userId
          ) ?? undefined
        ) 
      }}

      resolveMentionSuggestions={async ({ text }) => {
        
        return users.filter((user)=> user.name.toLowerCase().includes(text.toLowerCase())).map((user)=>user.id)
      }}
    >
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense fallback={<FullScreenLoader label="Loading Document"/>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
