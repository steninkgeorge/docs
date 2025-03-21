



import { PenIcon } from "lucide-react";
import { Doc, Id } from "../../convex/_generated/dataModel";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import titleStore from "@/store/title-store";
import { error } from "console";
import { toast } from "sonner";

interface RenameInputDialogProps {
  children: React.ReactNode;
  id: Id<'documents'>
}

export function RenameInputDialog({
  children,
  id
}: RenameInputDialogProps) {
  const {title, setTitle}= titleStore()
  const [input, setInput] = useState(
    title
  );
  const [open, setOpen] = useState(false);
  const renameDocument = useMutation(api.document.renameDocument);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

    const handleSubmit = async (e: any) => {
      e.preventDefault()
      

      try {
        await renameDocument({ id: id, title: input }).catch((error)=>toast.error(error)).then(()=>toast.success('file renamed')).finally(()=>{setTitle(input);
        setOpen(false);})
        
      } catch (error) {
        console.log(`Error:${error}`);
      }
    };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>Rename Document</DialogTitle>
          <DialogDescription>
            Enter a new name for your document.
          </DialogDescription>
        </DialogHeader>
        <form  >
          <Input
            placeholder="give a title"
            value={input}
            onChange={(e) => handleChange(e)}
            autoFocus
          />
        </form>
        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button type="button" onClick={(e)=>handleSubmit(e)}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

