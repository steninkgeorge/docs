'use client'

import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { templates } from "@/constants/template";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";


export const TemplateGallery=()=>{
    const [isCreating , setIsCreating]= useState(false)
  const router = useRouter();

    const handleClick=()=>{
        setIsCreating(true)
        router.push('/documents/123')
        
    }

    return (
      <div className="flex flex-col bg-neutral-100 max-w-screen p-2 w-full">
        <div className="mx-auto space-y-2 p-1">
          <div className="font-medium px-3">Start with a template</div>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-screen-lg "
          >
            <CarouselContent>
              {templates.map(({ id, label, image }) => (
                <CarouselItem
                  key={id}
                  className="md:basis-1/2 lg:basis-1/3 xl:basis-1/5 2xl:basis-1/6"
                >
                  <div className={cn("p-1 flex flex-col" , isCreating && 'pointer-events-none opacity-50')}>
                    <Card
                      onClick={handleClick}
                      className="border border-transparent hover:border-blue-500 transition-colors cursor-pointer"
                    >
                      <CardContent className="flex aspect-[3/4] items-center justify-center p-6">
                        <div className="flex  items-center justify-center space-y-3">
                          <div className="w-full h-full">
                            <Image
                              src={image}
                              alt={label}
                              width={100}
                              height={100}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <div className="text-sm font-medium truncate p-1 translate-x-1">
                      {label}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    );
}