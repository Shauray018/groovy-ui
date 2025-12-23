"use client";

import { Button } from "../ui/button";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import SocialButtons from "./SocialButtons";
import { AuroraText } from "../ui/aurora-text";
import { useRouter } from "next/navigation";

export function Navbar() { 

  const router = useRouter(); 


  return ( 
    <div className="sticky top-0 z-50 flex  justify-between items-center  shadow p-4 ">
      <div>
        <span onClick={() => { 
          router.push("/")
        }} className="text-4xl cursor-pointer font-bold mx-10 tracking-tighter md:text-5xl lg:text-2xl">
            Groovy  <AuroraText>UI</AuroraText>
        </span>
        <Button onClick={() =>  {router.push("/docs")}} className="cursor-pointer" variant="ghost">
          Components
        </Button>
        <Button variant="ghost">
          Templates
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <AnimatedThemeToggler />
        <SocialButtons />
      </div>
    </div>
  );
}
