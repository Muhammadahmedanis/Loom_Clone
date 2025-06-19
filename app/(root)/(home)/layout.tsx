import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { Metadata } from 'next'
import React, { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'LOOM',
  description: 'Video Calling app',
  icons: {
    icon: '/icons/logo.svg'
  }
}

export default function Homelayout( { children } : {children: ReactNode}) {
  return (
    <main className='relative'>
      <Navbar />
        <div className='flex'>
          <Sidebar />
            <section className='flex min-h-screen flex-1 flex-col px-14 pb-6 pt-28 max-md:pb-14 md:px-14'>
                <div className='w-full'>
                    { children }
                </div>
            </section>
        </div>
    </main>
  )
}
