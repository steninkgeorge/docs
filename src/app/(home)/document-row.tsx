import { Doc } from "../../../convex/_generated/dataModel"
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
  MoreVertical,
  PersonStandingIcon,
} from "lucide-react";
import {
  BsPersonBadge,
  BsPersonFillExclamation,
  BsFileEarmarkText,
  BsFile,
} from "react-icons/bs";

import { SiGoogledocs } from "react-icons/si";
import { stat } from "fs";
import { FullScreenLoader } from "@/components/full-screen-loader";
import { Button } from "@/components/ui/button";


interface DocumentsRowProps{
    documents: Doc<'documents'>[]
}

export const DocumentsRow= ({documents}:DocumentsRowProps)=>{
      const { user } = useUser();
      const router = useRouter();
      const handleClick = (docId: string) => {
        router.push(`/documents/${docId}`);
      };
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
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    className="rounded-full"
                  >
                    <MoreVertical className="size-4 " />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
    
      
    );
}