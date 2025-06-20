'use client'

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const pathName = usePathname();

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-[var(--color-dark-1)] p-4 pt-28 text-white max-sm:hidden lg:w-[240px]">
        <div className="flex flex-1 flex-col gap-6">
            { 
                sidebarLinks?.map(link => {
                    const isActive =  pathName === link.route || pathName.startsWith(`${link.route}/`);
                    return (
                        <Link 
                            href={link?.route} 
                            key={link.label} 
                            className={cn('flex gap-4 items-center p-4 rounded-[7px] justify-start', { 'bg-[var(--color-blue-1)]': isActive })}>
                                <Image style={{ height: 'auto', width: 'auto' }} src={link.imgUrl} alt={link.imgUrl} width={24} height={24} />
                                <p className="text-lg font-semibold max-lg:hidden">{link.label}</p>
                        </Link>
                    ) 
                }) 
            }
        </div>
    </section>
  )
}
