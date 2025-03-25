'use client'

import { InboxNotificationList , InboxNotification } from "@liveblocks/react-ui"

import {
    ClientSideSuspense,
  useDeleteAllInboxNotifications,
  useInboxNotifications,
  useMarkAllInboxNotificationsAsRead,
  useUnreadInboxNotificationsCount,
} from "@liveblocks/react/suspense";

 import {  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent  } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BellIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const Inbox= ()=>{

    return (
      <ClientSideSuspense
        fallback={
          <>
            <Button
              variant={"ghost"}
              size={"icon"}
              className="relative "
              disabled
            >
              <BellIcon className="size-4 " />
            </Button>
            <Separator orientation="vertical" className="h-6" />
          </>
        }
      >
        <InboxMenu />
      </ClientSideSuspense>
    );

}


const InboxMenu= ()=>{
  const { inboxNotifications } = useInboxNotifications();

    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} size={"icon"} className="relative ">
              <BellIcon className="size-4 " />

              <div className=" absolute bg-sky-400 w-4 h-4 flex items-center justify-center rounded-full top-0 right-0 transform translate-x-1 -translate-y-1 ">
                <p className="text-[8px] text-white text-center">
                  {inboxNotifications.length}
                </p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-auto " align="end">
            {inboxNotifications.length > 0 ? (
              <InboxNotificationList>
                {inboxNotifications.map((data) => (
                  <InboxNotification key={data.id} inboxNotification={data} />
                ))}
              </InboxNotificationList>
            ) : (
              <p className="text-gray-500 text-sm p-2">No new notifications</p>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator orientation="vertical" className="h-6"/>
      </>
    );
}
