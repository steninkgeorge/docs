import { PaginationStatus } from "convex/react"
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
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { DocumentsRow } from "./document-row";


interface DocumentsTableProps{
    documents : Doc<'documents'>[] | undefined, 
    status: PaginationStatus,
    loadMore: (numItems: number)=> void
}


export const DocumentsTable = ({documents, status, loadMore}: DocumentsTableProps) => {
     
    const { user } = useUser();
    const router = useRouter();
    const handleClick = (docId: string) => {
       router.push(`/documents/${docId}`);
     };
       
  return (
    <div className="max-w-screen-xl mx-auto px-14 py-6 flex flex-col gap-5">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Name</TableHead>

            <TableHead>Shared</TableHead>
            <TableHead>Created at</TableHead>
          </TableRow>
        </TableHeader>
         {documents === undefined ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={3} className="text-center py-8">
                <FullScreenLoader label="loading" />
              </TableCell>
            </TableRow>
          </TableBody>
        ) : documents.length === 0 ? (
          <TableBody>
            <TableRow>
              <TableCell>No document available, Try creating One</TableCell>
            </TableRow>
          </TableBody>
        ):(<DocumentsRow documents={documents}/>) }
        
      </Table>
    </div>
  );
};

