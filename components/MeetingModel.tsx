import { ReactNode } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";

interface MeetingModelProps{
    isOpen: boolean;
    onClose: () => void;
    title: string;
    className?: string;
    children?: ReactNode
    handleClick?: () => void;
    buttonText?: string;
    img?: string;
    buttonIcon?: string;
}

export default function MeetingModel({ isOpen, onClose, title, className, children, handleClick, buttonText, img, buttonIcon}: MeetingModelProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-[var(--color-dark-1)] px-6 py-9 text-white">
            <div className="flex flex-col gap-6">
                {img && (
                    <div className="flex justify-center">
                        <Image src={img} alt='image' height={72} width={72} />
                    </div>
                )}
                <h1 className={cn('text-3xl font-bold leading-[42px]', className)}>{title}</h1>
                {children}
                <Button className="bg-[var(--color-blue-1)] cursor-pointer rounded focus-visible:ring-0 focus-visible:ring-offset-0 hover:bg-[var(--color-blue-1)]" onClick={handleClick}>{buttonIcon && ( <Image src={buttonIcon} alt="buttonIcon" width={13} height={13} /> ) } &nbsp; {buttonText || "Schedule Meeting"}</Button>
            </div>
        </DialogContent>
    </Dialog>
  )
}
