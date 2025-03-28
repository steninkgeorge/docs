"use client";
import { Navbar } from "./navbar";
import { TemplateGallery } from "./template-gallery";
import { usePaginatedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";

import { DocumentsTable } from "./documents-table";
import { useSearchParam } from "@/hooks/use-search-param";


//prop -> document , title , shared(user) , created_at    3dot-> rename , remove and open in new tab

//TODO: once this much done , we can add sort options and fetch options
//sort -> last modified by me , modified , title and last opened
//fetch options -> owned by me , owned by anyone , not owned by me

//TODO: document saving

const Home = () => {
  const [search]=useSearchParam('search')

  const {results ,isLoading,  status , loadMore} = usePaginatedQuery(api.document.get,  {search}, {initialNumItems: 8});
  

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white dark:bg-gunmetal-400  dark:border-gunmetal-600 p-4">
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
