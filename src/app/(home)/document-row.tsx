import { Doc, Id } from "../../../convex/_generated/dataModel"
import { compareAsc, format } from "date-fns";
import {
  Table,
  TableCaption,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableFooter,
  TableHeader,
} from "@/components/ui/table";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

import {
  Building2Icon,
  BuildingIcon,
  CircleUserIcon,
  DeleteIcon,
  MoreVertical,
  PenIcon,
  PersonStandingIcon,
} from "lucide-react";
import {
  BsPersonBadge,
  BsPersonFillExclamation,
  BsFileEarmarkText,
  BsFile,
  BsTrash,
  BsX,
  BsTrash2,
  BsTrash3,
} from "react-icons/bs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { BsBoxArrowUpRight } from "react-icons/bs";
import { SiGoogledocs } from "react-icons/si";
import { stat } from "fs";
import { FullScreenLoader } from "@/components/full-screen-loader";
import { Button } from "@/components/ui/button";
import { FaDrumSteelpan, FaTrash } from "react-icons/fa";

import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { RenameInputDialog } from "@/components/rename-alert-component";
import { RemoveDocumentDialog } from "@/components/remove-alert-component";
import titleStore from "@/store/title-store";


interface DocumentsRowProps{
    documents: Doc<'documents'>[]
}

export const DocumentsRow= ({documents}:DocumentsRowProps)=>{
      const { user } = useUser();
      const router = useRouter();
      const {setTitle}= titleStore()

      const handleClick = (docId: string , index : number) => {
        router.push(`/documents/${docId}`);
        setTitle(documents[index].title)
      };

      const handleOpenNewTab=(docId: string, e: any)=>{
        e.stopPropagation()
        window.open(`/documents/${docId}`, "_blank", "noopener,noreferrer");
      }

    
    return (
      <TableBody>
        {documents.map((doc, index) => (
          <TableRow
            key={doc._id}
            className="cursor-pointer"
            onClick={() => handleClick(doc._id, index)}
          >
            <TableCell className="flex gap-2 items-center">
              <SiGoogledocs className="size-5 text-blue-500" />
              {doc.title}
            </TableCell>

            <TableCell className="text-sm  text-muted-foreground">
              {doc.organizationId ? (
                <div className="flex gap-x-2 items-center -translate-x-[18px]">
                  <Building2Icon className="w-4 h-4 text-muted-foreground" />{" "}
                  <p>Organization</p>
                </div>
              ) : (
                <div className="flex gap-x-2 items-center -translate-x-[18px]">
                  <CircleUserIcon className="w-4 h-4 text-muted-foreground rounded-sm " />
                  <p>{user ? user.fullName : "Personal"}</p>
                </div>
              )}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {format(new Date(doc._creationTime), "dd MMM, yyyy")}
            </TableCell>
            <TableCell className="flex justify-end ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    className="rounded-full  focus-visible:ring-0"
                  >
                    <MoreVertical className="size-4 " />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem
                    onClick={(e) => handleOpenNewTab(doc._id, e)}
                    className="gap-x-2"
                  >
                    <BsBoxArrowUpRight className="size-6" />
                    Open in new tab
                  </DropdownMenuItem>
                  <RemoveDocumentDialog document={doc}>
                    <DropdownMenuItem
                      onSelect={(e) => e.preventDefault()}
                      onClick={(e) => e.stopPropagation()}
                      className="gap-x-2"
                    >
                      <BsTrash3 className="size-6 " />
                      Remove
                    </DropdownMenuItem>
                  </RemoveDocumentDialog>

                  <RenameInputDialog id={doc._id}>
                    <DropdownMenuItem
                      onSelect={(e) => e.preventDefault()}
                      onClick={(e) => e.stopPropagation()}
                      className="gap-x-2"
                    >
                      <PenIcon className="size-6 " />
                      Rename
                    </DropdownMenuItem>
                  </RenameInputDialog>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
}