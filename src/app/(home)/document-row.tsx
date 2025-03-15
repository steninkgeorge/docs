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

interface DocumentsRowProps{
    documents: Doc<'documents'>[]
}

export const DocumentsRow= ({documents}:DocumentsRowProps)=>{
      const { user } = useUser();
      const router = useRouter();
      const handleClick = (docId: string) => {
        router.push(`/documents/${docId}`);
      };
  const deleteDocument = useMutation(api.document.deleteDocument);

      const handleOpenNewTab=(docId: string, e: any)=>{
        e.stopPropagation()
        window.open(`/documents/${docId}`, "_blank", "noopener,noreferrer");
      }

      const handleRemoveById= async(docId: Id<'documents'>, e: any)=>{
        e.stopPropagation()
          try{
            await deleteDocument({id: docId})
          }catch(error){
            console.log( `Error:${error}`)
          }
      }

    return (
      <TableBody>
        {documents.map((doc) => (
          <TableRow
            key={doc._id}
            className="cursor-pointer"
            onClick={() => handleClick(doc._id)}
          >
            <TableCell className="flex gap-2 items-center">
              <SiGoogledocs className="size-5 text-blue-500" />
              {doc.title}
            </TableCell>

            <TableCell className="text-sm  text-muted-foreground">
              {doc.organizationId ? (
                <div className="flex">
                  <Building2Icon className="w-4 h-4 text-muted" />{" "}
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
                  <DropdownMenuItem onClick={(e)=>handleRemoveById(doc._id, e)} className="gap-x-2">
                    <BsTrash3 className="size-6 " />
                    Remove
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
}