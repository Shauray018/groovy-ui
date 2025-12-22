"use client"

import { LineShadowText } from "@/components/ui/line-shadow-text";
import { AuroraText } from "@/components/ui/aurora-text";
import { Style_Script } from "next/font/google";
import { LightRays } from "@/components/ui/light-rays";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { ArrowRight } from "lucide-react";
import { ChevronRight } from "lucide-react";


export default function Home() {
  return (
    <div className="flex-col w-full items-center justify-center font-sans">
      <div className="flex-col justify-center items-center w-full text-center">
        
        <div className="flex-col w-full items-center justify-center ">
          <h1 className="text-4xl font-bold tracking-tighter mt-40  md:text-5xl lg:text-7xl">
            Built by the Community. 
            {/* Groovy <AuroraText>UI</AuroraText> */}
          </h1>
          <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl">
          For Mobile Apps.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            An open-source React Native UI library for Expo apps
          </p>
          <p className=" text-lg text-muted-foreground">
            featuring
            fancy, animated components crafted 
            </p>
          <p className=" text-lg text-muted-foreground">
          and maintained by the community.
          </p>
        </div>
        <div className="flex justify-center items-center gap-6 mt-6">
          <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="dark:bg-black  cursor-pointer bg-white text-black dark:text-white flex items-center space-x-2"
          >
            <span className="pr-3">
              Browse Components
            </span>
          <ChevronRight size={15} />
          </HoverBorderGradient>
         
        </div>
      </div>
       

    <LightRays />
    </div>
  );
}
