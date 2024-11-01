import Link from "next/link";
import { MainNav } from "@/components/navbar/main-nav";
import { MobileNav } from "@/components/navbar/mobile-nav";
import { siteConfig } from "@/config/site";
import { ModeToggle } from "@/components/ui/ModeToggle";

export function SiteHeader() {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-14 items-center px-4'>
        <MobileNav items={siteConfig.mainNav} />
        <div className='mr-4 hidden md:flex'>
          <Link href='/' className='mr-6 flex items-center space-x-2'>
            <span className='font-bold'>{siteConfig.name}</span>
          </Link>
          <MainNav items={siteConfig.mainNav} />
        </div>
        <div className='flex flex-1 items-center justify-end space-x-4'>
          <nav className='flex items-center space-x-2'>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
