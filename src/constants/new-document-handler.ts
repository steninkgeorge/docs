import { ReactMutation, useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { api } from "../../convex/_generated/api";
import { FunctionReference } from "convex/server";

type mutate=  ReactMutation<FunctionReference<"mutation", "public", {
    title?: string | undefined;
    initialContent?: string | undefined;
}, string & {
    __tableName: "documents";
}, string | undefined>>

export class NewDocument {
 
  private static mutate:mutate ;

  static init( mutate: mutate) {
    this.mutate = mutate;
  }

  static createDocument({
    title,
    initialContent='' ,
  }:{title?: string, initialContent:string
  }) {
    if (!this.mutate) {
      throw new Error('unauthorized')
    }

    try {
      const documentId = this.mutate({
        title,
        initialContent,
      });
      return documentId

    } catch (error) {
      throw new Error(`Failed to create document:${error}`);
    }
  }
}

export const useDocument = () => {
  const router = useRouter();
  const mutate = useMutation(api.document.create);

  useEffect(() => {
    NewDocument.init(mutate);
  }, [router, mutate]);

  return NewDocument;
};
