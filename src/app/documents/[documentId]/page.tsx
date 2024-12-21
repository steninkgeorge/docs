
import { Editor } from "./editor";



interface DocumentIdProps{
    params: Promise<{documentId: string}>
}

const DocumentPage =async ({ params }: DocumentIdProps) => {
    const { documentId} = await params 
  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <Editor />
    </div>
  );
};

export default DocumentPage