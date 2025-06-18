import { PaginatedGridLayout, SpeakerLayout } from "@stream-io/video-react-sdk";
import { useState } from "react"

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right'

export default function MeetingRoom() {
    const[layout, setLayout] = useState<CallLayoutType>('speaker-left');

    const CallLayoout = () => {
        switch (layout) {
            case 'grid':
                return <PaginatedGridLayout/>;
            
            case 'speaker-right':
                return <SpeakerLayout participantsBarPosition='left' />;

            case 'speaker-left':
                return <SpeakerLayout participantsBarPosition='right' />;
        
            default:
                return <SpeakerLayout participantsBarPosition='right' />;

        }
    }

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
        <div className="relative flex size-full items-center justify-center">
            <div className="flex size-full max-w-[1000px] items-center">
                <CallLayoout />
            </div>
            <div className="h-[calc(100vh-86px)] hidden ml-2"></div>
        </div>
    </section>
  )
}
