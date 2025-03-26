import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { api } from "../../convex/_generated/api";

export class NewDocument {
 
  private static mutate: any;

  static init( mutate: any) {
    this.mutate = mutate;
  }

  static createDocument({
    title,
    initialContent='' ,
  }:{title?: string, initialContent:string
  }) {
    if (!this.mutate) {
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
