'use client'

import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation";

export default function MobileNav() {
    const pathName = usePathname();

  return (
    <section className="w-full max-w-[264px]">
        <Sheet>
            <SheetTrigger asChild>
                <Image src="/icons/hamburger.svg" alt="close" width={30} height={30} className="cursor-pointer sm:hidden" />
            </SheetTrigger>
            <SheetContent side="left" className="border-none  bg-[var(--color-dark-1)]">
            <Link href='/' className="flex items-center gap-1">
                <Image src="/icons/logo.svg" alt="Loom logo" width={32} height={32} className="max-sm:size-12"/>
                <p className="text-[26px] font-extrabold text-white max-sm:hidden">Loom</p>
            </Link>
            <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
                <SheetClose asChild>
                    <section className="flex h-full flex-col gap-6 pt-16 text-white">
                         { 
                            sidebarLinks?.map(link => {
                                const isActive =  pathName === link.route;
                                return (
                                    <SheetClose asChild key={link.route}>
                                        <Link 
                                            href={link?.route} 
                                            key={link.label} 
                                            className={cn('flex gap-4 items-center p-4 rounded-lg w-full max-w-60', { 'bg-[var(--color-blue-1)]': isActive })}>
                                                <Image src={link.imgUrl} alt={link.imgUrl} width={20} height={20} />
                                                <p className="font-semibold">{link.label}</p>
                                        </Link>
                                    </SheetClose>
                                ) 
                            }) 
                        }
                    </section>
                </SheetClose>
            </div>
            </SheetContent>
        </Sheet>
    </section>
  )
}
