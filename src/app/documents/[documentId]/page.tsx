
import { Editor } from "./editor";
import { Toolbar } from "./toolbar";



interface DocumentIdProps{
    params: Promise<{documentId: string}>
}

const DocumentPage =async ({ params }: DocumentIdProps) => {
    const { documentId} = await params 
  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <Toolbar/>
      <Editor />
    </div>
  );
};

export default DocumentPage