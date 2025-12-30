"use client";

import { Button } from "../ui/button";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import SocialButtons from "./SocialButtons";
import { AuroraText } from "../ui/aurora-text";
import { useRouter } from "next/navigation";

export function Navbar() {
  const router = useRouter();

  return (
    <div className="fixed top-0 z-50 w-full px-4 md:px-8 lg:px-12 py-3">
      <div
        className="
          h-16 w-full
          flex items-center justify-between
          rounded-full px-6
          backdrop-blur-xl
          bg-white/10 dark:bg-black/20
          border border-white/10
        "
      >
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
    </div>
  );
}
