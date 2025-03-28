"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { getDocuments, getUsers } from "./action";
import { toast } from "sonner";
import { FullScreenLoader } from "@/components/full-screen-loader";
import { Id } from "../../../../convex/_generated/dataModel";

type User = {
  id: string;
  name: string;
  avatar: string;
};

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();
  const [users, setUsers] = useState<User[]>([]);

  const fetchUser = useMemo(
    () => async () => {
      try {
        const users = await getUsers();
        setUsers(users);
      } catch (error) {
        toast.error(`failed to fetch:${error}`);
      }
    },
    []
  );

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <LiveblocksProvider
      authEndpoint={async () => {
        const room = params.documentId as string;
        const response = await fetch("/api/liveblocks-auth", {
          method: "POST",
          body: JSON.stringify({ room }),
        });

        return await response.json();
      }}
      throttle={16}
      resolveUsers={async ({ userIds }) => {
        return userIds.map(
          (userId) => users.find((user) => user.id === userId) ?? undefined
        );
      }}
      resolveRoomsInfo={async ({ roomIds }) => {
        const documentsData = await getDocuments(roomIds as Id<"documents">[]);

        return documentsData.map((documentData) => ({
          name: documentData.name,
          id: documentData.id,
        }));
      }}
      resolveMentionSuggestions={async ({ text }) => {
        return users
          .filter((user) =>
            user.name.toLowerCase().includes(text.toLowerCase())
          )
          .map((user) => user.id);
      }}
    >
      <RoomProvider
        id={params.documentId as string}
        initialStorage={{ leftMargin: 56, rightMargin: 56 }}
      >
        <ClientSideSuspense
          fallback={<FullScreenLoader label="Loading Document" />}
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
