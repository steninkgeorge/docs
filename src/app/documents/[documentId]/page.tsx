import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";
import { Document } from "./document";
import { preloadQuery } from "convex/nextjs";
import { auth } from "@clerk/nextjs/server";


interface DocumentIdProps{
    params: Promise<{documentId: Id<'documents'>}>
}

const DocumentPage =async ({ params }: DocumentIdProps) => {
    const doc = await params
    const documentId= doc.documentId

    const {getToken} = await auth()
    const token = getToken({template:'convex'}) ?? undefined

    if(!token){
      throw new Error('Unauthorized')
    }
    const preloadedDocument= await preloadQuery(api.document.getDocument, {id: documentId})

  return (
<Document preloadedDocument={preloadedDocument}/>
  );
};

export default DocumentPage