import StreamVideoProvider from "@/providers/StreamClientProvider";
import { Metadata } from "next";
import { ReactNode } from "react";


export const metadata: Metadata = {
  title: 'LOOM',
  description: 'Video Calling app',
  icons: {
    icon: '/icons/logo.svg'
  }
}

export default function RootLayout({ children} : { children: ReactNode }) {
  return (
    <main>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
    </main>
  )
}
