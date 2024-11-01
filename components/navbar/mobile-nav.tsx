"use client";

import * as React from "react";
import Link from "next/link";
import { NavItem } from "@/types/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

type MobileNavProps = {
  items?: NavItem[];
};

export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          className='mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden'
        >
          <Menu className='h-8 w-8' />
          <span className='sr-only'>Toggle menu</span>
        </Button>
      </SheetTrigger>
      {/* TODO: Add logo */}
      <SheetTitle> </SheetTitle>
      <SheetDescription></SheetDescription>
      <SheetContent side='left' className='pr-0'>
        <nav className='flex flex-col space-y-4'>
          {items?.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className='text-sm font-medium transition-colors hover:text-foreground/80'
              onClick={() => setOpen(false)}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
