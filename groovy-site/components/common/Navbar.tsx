"use client";

import { Button } from "../ui/button";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import SocialButtons from "./SocialButtons";
import { AuroraText } from "../ui/aurora-text";
import { useRouter } from "next/navigation";
import GlassSurface from "../GlassSurface";


export function Navbar() {
  const router = useRouter();

  return (
    <div className="fixed top-0 z-50 w-full px-4 md:px-8 lg:px-12 py-3">
      <GlassSurface
        width={"full"}
        height={64}
        borderRadius={50}
        displace={0.3}
        distortionScale={-120}
        redOffset={0}
        greenOffset={5}
        blueOffset={10}
        brightness={60}
        opacity={0.95}
        className="w-full"
      >
        <div className="h-16 w-full flex items-center justify-between px-6">
          {/* Left side */}
          <div className="flex items-center gap-2">
            <span
              onClick={() => router.push("/")}
              className="text-2xl cursor-pointer font-bold tracking-tighter whitespace-nowrap"
            >
              Groovy <AuroraText>UI</AuroraText>
            </span>

            <Button
              onClick={() => router.push("/docs")}
              className="cursor-pointer ml-4"
              variant="ghost"
            >
              Components
            </Button>

            <Button variant="ghost">Templates</Button>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <AnimatedThemeToggler />
            <SocialButtons />
          </div>
        </div>
      </GlassSurface>
    </div>
  );
}