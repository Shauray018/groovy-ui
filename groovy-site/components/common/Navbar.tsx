"use client";

import { Button } from "../ui/button";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import SocialButtons from "./SocialButtons";
import { AuroraText } from "../ui/aurora-text";
import { LineShadowText } from "../ui/line-shadow-text";

export function Navbar() { 
  return ( 
    <div className="sticky top-0 z-50 flex w-full justify-between items-center border-b  p-4 ">
      <div>
        <span className="text-4xl font-bold mx-10 tracking-tighter md:text-5xl lg:text-2xl">
            Groovy  <AuroraText>UI</AuroraText>
        </span>
        <Button variant="ghost">
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
