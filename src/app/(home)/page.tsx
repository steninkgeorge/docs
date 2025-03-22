"use client";
import { compareAsc, format } from "date-fns";
import Link from "next/link";
import { Navbar } from "./navbar";
import { TemplateGallery } from "./template-gallery";
import { usePaginatedQuery, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
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
import { Building2Icon, BuildingIcon, CircleUserIcon, MoreVertical, PersonStandingIcon } from "lucide-react";
import {
  BsPersonBadge,
  BsPersonFillExclamation,
  BsFileEarmarkText,
  BsFile,
} from "react-icons/bs";
import { useRouter } from "next/navigation";

import {SiGoogledocs} from 'react-icons/si'
import { stat } from "fs";
import { FullScreenLoader } from "@/components/full-screen-loader";
import { Button } from "@/components/ui/button";
import { DocumentsTable } from "./documents-table";
import { v } from "convex/values";
import { useSearchParam } from "@/hooks/use-search-param";


//prop -> document , title , shared(user) , created_at    3dot-> rename , remove and open in new tab

//TODO: once this much done , we can add sort options and fetch options
//sort -> last modified by me , modified , title and last opened
//fetch options -> owned by me , owned by anyone , not owned by me

//TODO: document saving

const Home = () => {
  const { user } = useUser();
      const router = useRouter();
  const [search]=useSearchParam('search')

  const {results ,isLoading,  status , loadMore} = usePaginatedQuery(api.document.get,  {search}, {initialNumItems: 8});
  const handleClick=(docId: string)=>{
    router.push(`/documents/${docId}`)
  }

  return (
    <div className=" min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplateGallery />

        <DocumentsTable
          documents={results}
          isLoading={isLoading}
          status={status}
          loadMore={loadMore}
        />
        
      </div>
    </div>
  );
};

export default Home;
