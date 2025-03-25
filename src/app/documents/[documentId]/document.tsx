'use client'

import { Editor } from "./editor";
import { Ruler } from "./ruler";
import { Toolbar } from "./toolbar";
import { Navbar } from "./navbar";
import { Id } from "../../../../convex/_generated/dataModel";
import { query } from "../../../../convex/_generated/server";
import { api } from "../../../../convex/_generated/api";
import { Preloaded, usePreloadedQuery, useQuery } from "convex/react";
import titleStore from "@/store/title-store";
import { Room } from "./Room";

interface DocumentProps {
  preloadedDocument: Preloaded<typeof api.document.getDocument>
}

export const Document =  ({ preloadedDocument }: DocumentProps) => {
  
  const document = usePreloadedQuery(preloadedDocument);

  return (
    <Room>
      <div className="min-h-screen bg-[#FAFBFD]">
        <div className="fixed flex flex-col bg-[#FAFBFD] px-4 pt-2 gap-y-2 top-0  left-0 right-0 z-10 print:hidden">
          <Navbar id={document._id} title={document.title}/>
          <Toolbar />
          <Ruler />
        </div>
        <div className=" pt-[112px] print:hidden">
          <Editor documentId={document._id} />
        </div>
      </div>
    </Room>
  );
};

