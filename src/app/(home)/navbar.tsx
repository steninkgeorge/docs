import Image from "next/image";
import { SearchInput } from "./search-input";
import {OrganizationSwitcher, UserButton} from '@clerk/nextjs'
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "next-themes";

export const Navbar = () => {
    const { theme } = useTheme();
    
    return (
      <nav className="flex items-center justify-between h-full w-full">
        <div className="flex gap-3 pr-6 items-center shrink-0">
          <div className="relative w-9 h-9">
            <Image 
              src={theme === "dark" ? "/logo-dark.svg" : "/logo.svg"} 
              alt="logo" 
              fill 
              className="object-contain" 
            />
          </div>
          <h3 className="text-xl font-semibold dark:text-gray-100">PenSpace</h3>
        </div>
        <SearchInput />
        <div className="flex gap-3 pl-4 items-center">
          <ThemeToggle />
          <OrganizationSwitcher 
            afterCreateOrganizationUrl={'/'} 
            afterLeaveOrganizationUrl="/" 
            afterSelectOrganizationUrl={'/'} 
            afterSelectPersonalUrl={'/'}
          />
          <UserButton />
        </div>
      </nav>
    );
}