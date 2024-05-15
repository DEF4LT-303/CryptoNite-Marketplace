"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useCurrentRole } from "@/hooks/currentRole";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    isAdmin?: boolean;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();
  const isAdmin = useCurrentRole() === "ADMIN";

  const filteredItems = items.filter((item) => isAdmin || !item.isAdmin);

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 flex-wrap justify-center sm:justify-start",
        className
      )}
      {...props}
    >
      {filteredItems.map((item) => (
        <>
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === item.href
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline",
              "justify-start"
            )}
          >
            <div className="text-[12px] sm:text-sm">{item.title}</div>
          </Link>
        </>
      ))}
    </nav>
  );
}
