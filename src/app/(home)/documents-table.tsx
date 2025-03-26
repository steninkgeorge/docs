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
  Loader2Icon,
  LoaderIcon,
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
import { useEffect, useRef } from "react";


interface DocumentsTableProps{
    documents : Doc<'documents'>[] | undefined, 
    isLoading: boolean, 
    status: PaginationStatus,
    loadMore: (numItems: number)=> void
}


export const DocumentsTable = ({documents,isLoading,  status, loadMore}: DocumentsTableProps) => {
     
    const router = useRouter();
    const loaderRef= useRef(null)
    
    const handleClick = (docId: string) => {
       router.push(`/documents/${docId}`);
     };


    useEffect(()=>{

        const observer= new IntersectionObserver((entries)=>{
            const [entry]= entries
            if (status==='CanLoadMore' && entry.isIntersecting ){
                loadMore(9)
            }
        }, {threshold: 0.5})

        const currentLoaderRef = loaderRef.current
         if (currentLoaderRef) {
           observer.observe(currentLoaderRef);
         }

           return () => {
             if (currentLoaderRef) {
               observer.unobserve(currentLoaderRef);
             }
           };
    } , [status , loadMore, isLoading])
       
  return (
    <div className="max-w-screen-xl mx-auto px-14 py-6 flex flex-col gap-5 h-full">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Name</TableHead>
            <TableHead>Shared</TableHead>
            <TableHead>Created at</TableHead>
          </TableRow>
        </TableHeader>
        {documents === undefined || isLoading ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={4} className="text-center h-24">
                <div className="flex flex-col items-center justify-center h-full gap-2">
                  <Loader2Icon className="size-6 text-muted-foreground animate-spin" />
                  <span className="text-sm text-muted-foreground">
                    Loading...
                  </span>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        ) : documents.length === 0 ? (
          <TableBody>
            <TableRow>
              <TableCell>No document available, Try creating One</TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <DocumentsRow documents={documents} />
        )}
      </Table>

      {status === "CanLoadMore" &&
        (isLoading ? (
          <div className="flex justify-center">
            <LoaderIcon className="size-6 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <div ref={loaderRef} className="h-8" />
        ))}
    </div>
  );
};

