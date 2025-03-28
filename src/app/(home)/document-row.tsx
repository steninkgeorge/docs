import { Doc } from "../../../convex/_generated/dataModel"
import {format } from "date-fns";
import {
 
  TableRow,
  TableBody,
  TableCell,

} from "@/components/ui/table";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

import {
  Building2Icon,
  CircleUserIcon,
  MoreVertical,
  PenIcon,
} from "lucide-react";
import {
 
  BsTrash3,
} from "react-icons/bs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
 
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { BsBoxArrowUpRight } from "react-icons/bs";
import { SiGoogledocs } from "react-icons/si";

import { Button } from "@/components/ui/button";

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

      const handleOpenNewTab = (
        docId: string,
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
      ) => {
        e.stopPropagation();
        window.open(`/documents/${docId}`, "_blank", "noopener,noreferrer");
      };

    
    return (
      <TableBody>
        {documents.map((doc, index) => (
          <TableRow
            key={doc._id}
            className="cursor-pointer dark:hover:bg-gunmetal-500/30 dark:border-gunmetal-600"
            onClick={() => handleClick(doc._id, index)}
          >
            <TableCell className="flex gap-2 items-center dark:border-gunmetal-600">
              <SiGoogledocs className="size-5 text-blue-500 dark:text-blue-400" />
              <span className="dark:text-gray-200">{doc.title}</span>
            </TableCell>

            <TableCell className="text-sm text-muted-foreground dark:border-gunmetal-600">
              {doc.organizationId ? (
                <div className="flex gap-x-2 items-center -translate-x-[18px]">
                  <Building2Icon className="w-4 h-4 text-muted-foreground dark:text-gray-400" />{" "}
                  <p className="dark:text-gray-400">Organization</p>
                </div>
              ) : (
                <div className="flex gap-x-2 items-center -translate-x-[18px]">
                  <CircleUserIcon className="w-4 h-4 text-muted-foreground dark:text-gray-400 rounded-sm" />
                  <p className="dark:text-gray-400">{user ? user.fullName : "Personal"}</p>
                </div>
              )}
            </TableCell>
            <TableCell className="text-muted-foreground dark:text-gray-400 dark:border-gunmetal-600">
              {format(new Date(doc._creationTime), "dd MMM, yyyy")}
            </TableCell>
            <TableCell className="flex justify-end ml-auto dark:border-gunmetal-600">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    className="rounded-full focus-visible:ring-0 dark:hover:bg-gunmetal-500"
                  >
                    <MoreVertical className="size-4 dark:text-gray-300" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 dark:bg-gunmetal-400 dark:border-gunmetal-600">
                  <DropdownMenuItem
                    onClick={(e) => handleOpenNewTab(doc._id, e)}
                    className="gap-x-2 dark:text-gray-200 dark:hover:bg-gunmetal-500"
                  >
                    <BsBoxArrowUpRight className="size-6 dark:text-gray-300" />
                    Open in new tab
                  </DropdownMenuItem>
                  <RemoveDocumentDialog Id={doc._id}>
                    <DropdownMenuItem
                      onSelect={(e) => e.preventDefault()}
                      onClick={(e) => e.stopPropagation()}
                      className="gap-x-2 dark:text-gray-200 dark:hover:bg-gunmetal-500"
                    >
                      <BsTrash3 className="size-6 dark:text-gray-300" />
                      Remove
                    </DropdownMenuItem>
                  </RemoveDocumentDialog>

                  <RenameInputDialog id={doc._id} title={doc.title}>
                    <DropdownMenuItem
                      onSelect={(e) => e.preventDefault()}
                      onClick={(e) => e.stopPropagation()}
                      className="gap-x-2 dark:text-gray-200 dark:hover:bg-gunmetal-500"
                    >
                      <PenIcon className="size-6 dark:text-gray-300" />
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