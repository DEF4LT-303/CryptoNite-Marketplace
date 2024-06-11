"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ToggleTheme() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" || resolvedTheme === "light" ? "dark" : "light");
  };

  if (!mounted) {
    // Render loading state while component is mounting
    return (
      <div>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground"
          disabled
        >
          {/* Hydartion Error needs fixing */}
          <Sun className="h-6 w-6" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="icon"
      className="text-muted-foreground"
      disabled={!mounted}
    >
      {resolvedTheme === "light" ? (
        <Sun className="h-6 w-6 transition-transform duration-300 transform rotate-0 scale-100" />
      ) : (
        <Moon className="h-6 w-6 transition-transform duration-300 transform rotate-0 scale-100" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
