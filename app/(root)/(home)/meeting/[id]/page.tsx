'use client'

import Loader from "@/components/Loader";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import { useState } from "react";


export default function Meeting() {
    const id = useParams().id as string;
    const { isLoaded } = useUser(); 
    const [isSetupComplete, setIsSetupComplete] = useState(false);
    const { call, isCallLoading } = useGetCallById(id);

    if (!isLoaded || isCallLoading) return <Loader />;

    return (
        <div className="h-screen w-full">
            <StreamCall call={call}>
                <StreamTheme>
                    {
                        !isSetupComplete ? (
                            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
                        ) : (
                            <MeetingRoom />
                        )
                    }
                </StreamTheme>
            </StreamCall>
        </div>
    );
}
