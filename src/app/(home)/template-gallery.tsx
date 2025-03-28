'use client'

import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { templates } from "@/constants/template";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useDocument } from "@/constants/new-document-handler";
import { Id } from "../../../convex/_generated/dataModel";
import { useTheme } from "next-themes";

export const TemplateGallery=()=>{
    const [isCreating , setIsCreating]= useState(false)
    const documentHandler=useDocument()
    const router = useRouter();
    const { theme } = useTheme();

    // Function to get dark version of image path
    const getDarkImagePath = (imagePath: string) => {
      if (theme === "dark") {
        // For SVG images, append "-dark" before extension
        return imagePath.replace(/(\.[^.]+)$/, "-dark$1");
      }
      return imagePath;
    };

    return (
      <div className="flex flex-col bg-neutral-100 dark:bg-gunmetal-400 max-w-screen p-2 w-full">
        <div className="mx-auto space-y-2 p-1">
          <div className="font-medium px-3 dark:text-gray-200">Start with a template</div>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-screen-lg"
          >
            <CarouselContent>
              {templates.map(({ id, label, image, content }) => (
                <CarouselItem
                  key={id}
                  className="w-full sm:basis-1/2 md:basis-1/4 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6"
                >
                  <div
                    className={cn(
                      "p-1 flex flex-col",
                      isCreating && "pointer-events-none opacity-50"
                    )}
                  >
                    <Card
                      onClick={() =>{
                        setIsCreating(true)
                        documentHandler
                        .createDocument({title:label, initialContent: content})
                        .then((id: Id<"documents">) =>
                          router.push(`/documents/${id}`)
                        ).finally(()=>setIsCreating(false))}
                       
                      }
                      className="border hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer dark:bg-gunmetal-300 overflow-hidden h-full"
                    >
                      <CardContent className="flex aspect-[3/4] items-center justify-center p-0 h-full">
                        <div className="flex items-center justify-center w-full h-full">
                          <div className="w-full h-full">
                            <Image
                              src={getDarkImagePath(image)}
                              alt={label}
                              width={100}
                              height={100}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <div className="text-sm font-medium truncate p-1 translate-x-1 dark:text-gray-200">
                      {label}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="dark:bg-gunmetal-500 dark:hover:bg-gunmetal-600 dark:border-gunmetal-600" />
            <CarouselNext className="dark:bg-gunmetal-500 dark:hover:bg-gunmetal-600 dark:border-gunmetal-600" />
          </Carousel>
        </div>
      </div>
    );
}