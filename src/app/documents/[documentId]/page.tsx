
import { Editor } from "./editor";
import { Ruler } from "./ruler";
import { Toolbar } from "./toolbar";
import { Navbar } from "./navbar";
import { Id } from "../../../../convex/_generated/dataModel";


interface DocumentIdProps{
    params: Promise<{documentId: Id<'documents'>}>
}

const DocumentPage =async ({ params }: DocumentIdProps) => {
    const doc = await params
    const documentId= doc.documentId

  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <div className="fixed flex flex-col bg-[#FAFBFD] px-4 pt-2 gap-y-2 top-0  left-0 right-0 z-10 print:hidden">
        <Navbar />
        <Toolbar />
        <Ruler/>
      </div>
      <div className=" pt-[112px] print:hidden">
        <Editor documentId= {documentId} />
      </div>
    </div>
  )
};

export default DocumentPage