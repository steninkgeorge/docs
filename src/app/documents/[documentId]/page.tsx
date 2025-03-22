
import { Editor } from "./editor";
import { Ruler } from "./ruler";
import { Toolbar } from "./toolbar";
import { Navbar } from "./navbar";
import { Id } from "../../../../convex/_generated/dataModel";
import { query } from "../../../../convex/_generated/server";
import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import titleStore from "@/store/title-store";
import { Room } from "./Room";


interface DocumentIdProps{
    params: Promise<{documentId: Id<'documents'>}>
}

const DocumentPage =async ({ params }: DocumentIdProps) => {
    const doc = await params
    const documentId= doc.documentId

  
  return (
        <Room >
    <div className="min-h-screen bg-[#FAFBFD]">
      <div className="fixed flex flex-col bg-[#FAFBFD] px-4 pt-2 gap-y-2 top-0  left-0 right-0 z-10 print:hidden">
        <Navbar docId={documentId} />
        <Toolbar />
        <Ruler />
      </div>
      <div className=" pt-[112px] print:hidden">
          <Editor documentId={documentId} />
      </div>
    </div>
        </Room>
  );
};

export default DocumentPage