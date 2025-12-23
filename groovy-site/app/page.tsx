"use client"

import { LightRays } from "@/components/ui/light-rays";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { ChevronRight } from "lucide-react";
import { Highlighter } from "@/components/ui/highlighter";
import { SiExpo } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";

export default function Home() {
  return (
    <div className="flex-col w-full items-center justify-center font-sans">
      <div className="flex-col justify-center items-center w-full text-center">
        
        <div className="flex-col w-full items-center justify-center">
          <h1 className="text-4xl font-bold tracking-tighter mt-40 md:text-5xl lg:text-7xl">
            Built by the Community.
          </h1>
          <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl">
            For Mobile Apps.
          </h1>

          <p className="mt-6 text-lg text-muted-foreground ">
            An open-source{" "}
            <Highlighter action="underline" color="#87CEFA">
              React Native UI
            </Highlighter>{" "}
            library for Expo apps
          </p>

          <p className="text-lg text-muted-foreground">
            featuring fancy, animated components crafted
          </p>
          <p className="text-lg text-muted-foreground">
            and maintained by the community.
          </p>
        </div>

        <div className="flex justify-center items-center gap-6 mt-6">
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="dark:bg-black cursor-pointer bg-white text-black dark:text-white flex items-center space-x-2"
          >
            <span className="pr-3">Browse Components</span>
            <ChevronRight size={15} />
          </HoverBorderGradient>
        </div>
       <div className="flex flex-wrap justify-center gap-10 mt-6 text-muted-foreground">
      
      <div className="flex items-center gap-3 hover:text-foreground transition-colors">
        <SiExpo size={26} />
        <span className="text-sm font-medium">Expo</span>
      </div>

      <div className="flex items-center gap-3 hover:text-foreground transition-colors">
        <FaReact size={26} />
        <span className="text-sm font-medium">React Native</span>
      </div>

      <div className="flex items-center gap-3 hover:text-foreground transition-colors">
        <SiTypescript size={26} />
        <span className="text-sm font-medium">TypeScript</span>
      </div>

      <div className="flex items-center gap-3 hover:text-foreground transition-colors">
        <img
          src="https://docs.swmansion.com/react-native-reanimated/img/logo-dark.svg"
          alt="Reanimated"
          className="h-6 w-auto opacity-80"
        />
        <span className="text-sm font-medium">Reanimated</span>
      </div>

    </div>
      </div>

      <LightRays />
    </div>
  );
}
