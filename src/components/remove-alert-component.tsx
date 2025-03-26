import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PenIcon } from "lucide-react";
import { Doc, Id } from "../../convex/_generated/dataModel";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { AlertDescription } from "./ui/alert";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface RenameInputDialogProps {
  Id: Id<"documents">;
  children: React.ReactNode;
}

export function RemoveDocumentDialog({
  Id,
  children,
}: RenameInputDialogProps) {

    const [open, setOpen] = useState(false);
  const deleteDocument = useMutation(api.document.deleteDocument);
const router = useRouter()

  const handleDelete =  (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    try {
       deleteDocument({ id:Id }).catch((error)=>toast.error(error))
      .then(()=>{toast.success('file removed')
        
      })
      router.replace("/");
     
    } catch (error) {
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDescription>
          This action cannot be undone. This will
          permanently delete the document. 
        </AlertDescription>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
            Cancel
          </AlertDialogCancel>
          <Button variant={"destructive"} onClick={(e)=>handleDelete(e)}>Delete</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
