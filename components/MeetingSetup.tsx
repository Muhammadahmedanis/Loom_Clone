'use client'

import { DeviceSettings, useCall, VideoPreview } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function MeetingSetup({ setIsSetupComplete } : { setIsSetupComplete: (value: boolean) => void }) {
    const [isMicCamToggleOn, setIsMicCamToggleOn] = useState(false);
    const call = useCall();

    if(!call) throw new Error("useCall mmust be used within StreamCall component")

    useEffect(() => {
        if (isMicCamToggleOn) {
            call?.camera.disable();
            call?.microphone.disable();
        }
        call?.camera.enable();
        call?.microphone.enable();

    }, [isMicCamToggleOn, call?.camera, call?.microphone])
    
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
        <h1>Setup</h1>
        <VideoPreview />
        <div className="flex h-16 items-center gap-3">
            <label className="flex items-center gap-2 font-medium">
                <input type="checkbox" checked={isMicCamToggleOn} onChange={(e) => setIsMicCamToggleOn(e.target.checked)} />
                Joim with mic and camera off
            </label>
            <DeviceSettings />
        </div>
        <Button className="cursor-pointer rounded-md bg-green-400 px-4 py-2.5" 
        onClick={() => {
            call.join();
            setIsSetupComplete(true);
        }}>
        Join meeting</Button>
    </div>
  )
}
