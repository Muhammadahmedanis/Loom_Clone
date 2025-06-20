import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn,  UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='flex justify-between fixed z-50 w-full bg-[var(--color-dark-1)] px-6 pt-4 pb-2 lg:px-10'>
      <Link href="/" className='flex items-center gap-1' >
        <Image
          src="/icons/logo.svg"
          alt='Yoom Logo'
          width={32}
          height={32}
          className='max-sm:size-10'
        />
        <p className='text-[26px] font-extrabold text-white max-sm:hidden'>Yoom</p>
      </Link>
      <div className='flex-between gap-5'>
      {/* CLERK USER MANAGEMENT */}

      <SignedIn>
        <UserButton />
      </SignedIn>

      {/* MOBILE NAV */}

      <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar

// 12@Aieo#
// NAvqX65T$TFm@Zm stream password
