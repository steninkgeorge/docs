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
import { toast } from "sonner";

interface RenameInputDialogProps {
  children: React.ReactNode;
  id: Id<"documents">;
  title:string;
}

export function RenameInputDialog({ children, id, title }: RenameInputDialogProps) {
  const [input, setInput] = useState(title);
  const [open, setOpen] = useState(false);
  const renameDocument = useMutation(api.document.renameDocument);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      renameDocument({ id: id, title: input.trim() })
        .catch((error) => toast.error(error))
        .then(() => toast.success("file renamed"))
        .finally(() => {
          setOpen(false);
        });
    } catch (error) {
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
        <form
          onSubmit={(e) => {
            handleSubmit(e)
          }}
        >
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
          <Button type="button" onClick={(e) => handleSubmit(e)}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
