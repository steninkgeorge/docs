'use client'

import { ClientSideSuspense } from "@liveblocks/react";
import { Separator } from "@/components/ui/separator";
import {
  useOthers,
  useSelf,
} from "@liveblocks/react/suspense";

const SIZE = 36;

export const Avatars = () => {
  return (
    <ClientSideSuspense fallback={null}>
      <AvatarStack />
    </ClientSideSuspense>
  );
};

const AvatarStack = () => {
  const users = useOthers();
  const currentUser = useSelf();
  
  
  return (
    <>
      {
       users.length>=1 &&  (<>
          <div className="flex items-center">
            <div className="relative ml-2">
              <Avatar src={currentUser.info.avatar} name={"You"} />
            </div>

            <div className="flex">
              {users !== null &&
                users.map(({ connectionId, info }) => {
                  return (
                    <Avatar
                      key={connectionId}
                      name={info.name}
                      src={info.avatar}
                    />
                  );
                })}
            </div>
          </div>
          <Separator orientation="vertical" className="h-6" />
        </>)
      }
    </>
  );
};

interface AvatarProps {
  name: string;
  src: string;
}

export const Avatar = ({ name, src }: AvatarProps) => {
  return (
    <div
      style={{ width: SIZE, height: SIZE }}
      className=" realtive -ml-2 group border-4 dark:bg-gunmetal-500 dark:border-gunmetal-400 bg-gray-400 border-white flex rounded-full shrink-0 place-content-center"
    >
      <div className="absolute opacity-0 group-hover:opacity-100 text-white bg-black rounded-lg top-1 text-xs mt-2.5 whitespace-nowrap px-2 py-1 z-10 transition-opacity ">
        {name}
      </div>
      <img src={src} alt={name} className="size-full rounded-full" />
    </div>
  );
};
