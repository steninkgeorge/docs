import { PaginationStatus } from "convex/react"
import { Doc } from "../../../convex/_generated/dataModel"
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";

import {
  Loader2Icon,
  LoaderIcon,
} from "lucide-react";

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
     
    const loaderRef= useRef(null)
    
    

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
          <TableRow className="hover:bg-transparent dark:border-gunmetal-600">
            <TableHead className="pr-20 dark:text-gray-300">Name</TableHead>
            <TableHead className="px-4 dark:text-gray-300">Shared</TableHead>
            <TableHead className="dark:text-gray-300">Created at</TableHead>
          </TableRow>
        </TableHeader>
        {documents === undefined || isLoading ? (
          <TableBody>
            <TableRow className="dark:border-gunmetal-600">
              <TableCell colSpan={4} className="text-center h-24 dark:border-gunmetal-600">
                <div className="flex flex-col items-center justify-center h-full gap-2">
                  <Loader2Icon className="size-6 text-muted-foreground animate-spin dark:text-gray-400" />
                  <span className="text-sm text-muted-foreground dark:text-gray-400">
                    Loading...
                  </span>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        ) : documents.length === 0 ? (
          <TableBody>
            <TableRow className="dark:border-gunmetal-600">
              <TableCell className="dark:text-gray-400 dark:border-gunmetal-600">No document available, Try creating One</TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <DocumentsRow documents={documents} />
        )}
      </Table>

      {status === "CanLoadMore" &&
        (isLoading ? (
          <div className="flex justify-center">
            <LoaderIcon className="size-6 text-muted-foreground animate-spin dark:text-gray-400" />
          </div>
        ) : (
          <div ref={loaderRef} className="h-8" />
        ))}
    </div>
  );
};

