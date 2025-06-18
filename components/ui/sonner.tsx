"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="top-center"
      toastOptions={{
        classNames: {
          toast: "bg-[#1C1F2E] text-white border-none",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
