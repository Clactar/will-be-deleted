"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { NavItem } from "@/types/navigation";

type MainNavProps = {
  items?: NavItem[];
};

export function MainNav({ items }: MainNavProps) {
  const pathname = usePathname();

  return (
    <div className='flex gap-6 md:gap-10'>
      {items?.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center text-sm font-medium transition-colors hover:text-foreground/80",
            pathname === item.href ? "text-foreground" : "text-foreground/60",
            item.disabled && "cursor-not-allowed opacity-80"
          )}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
}
