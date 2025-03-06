

import { useState } from "react";
import { Editor } from "./editor";
import { Ruler } from "./ruler";
import { Toolbar } from "./toolbar";



interface DocumentIdProps{
    params: Promise<{documentId: string}>
}

const DocumentPage =async ({ params }: DocumentIdProps) => {

   

    const { documentId} = await params 
  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <Toolbar />
      <div className=" pt-[60px]">
        <Ruler />
        <Editor  />
      </div>
    </div>
  );
};

export default DocumentPage