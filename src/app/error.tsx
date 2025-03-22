'use client'

import { Button } from "@/components/ui/button";
import { AlertTriangleIcon } from "lucide-react"
import Link from "next/link";

const ErrorPage=({error, reset}:{error:Error & {digest?: string} , reset:()=>void })=>{
    return (
      <div className="flex items-center justify-center flex-col min-h-screen">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="rounded-full bg-rose-300 p-3">
              <AlertTriangleIcon className="size-10 text-rose-600" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">
              {" "}
              something went wrong
            </h3>
            <p>{error.message}</p>
          </div>
          <div className="flex items-center gap-x-2">
            <Button onClick={reset} className="font-medium px-6">Try again</Button>

            <Button className="font-medium" asChild variant={"ghost"}>
              <Link href={'/'}>go back</Link>
            </Button>
          </div>
        </div>
      </div>
    );
}

export default ErrorPage