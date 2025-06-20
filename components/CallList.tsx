'use client'

import { useGetCalls } from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MeetingCard from "./MeetingCard";
import Loader from "./Loader";
import { toast } from "sonner";

export default function CallList({ type } : { type: 'ended' | 'upcoming' | 'recordings'} ) {
    const { endedCalls, upComingCalls, callRecordings, loading } = useGetCalls();
    const router = useRouter();
    const [recordings, setRecordings] = useState<CallRecording[]>([])

    const getCalls = () => {
        switch (type) {
            case 'ended':
                return endedCalls;
            case 'recordings':
                return recordings;
            case 'upcoming':
                return upComingCalls;
            default:
                return [];
        }
    }

        const getNoCallsMessage = () => {
        switch (type) {
            case 'ended':
                return "No Previous Calls";
            case 'recordings':
                return 'No Recordings';
            case 'upcoming':
                return 'No Upcoming Calls';
            default:
                return '';
        }
    }

    useEffect(() => {
        const fetchRecordings = async () => {
            try {
                const callData = await Promise?.all(callRecordings.map((meeting) => meeting?.queryRecordings()));
                const recordings = callData?.filter((call) => call.recordings.length > 0)?.flatMap(call => call?.recordings);
                setRecordings(recordings);   
            } catch (error) {
                console.log(error);
                toast.error("Try again later");
            }
        }

        if( type === 'recordings') fetchRecordings();
    }, [type, callRecordings])
    

    const calls = getCalls();
    const noCallsMessage = getNoCallsMessage();
    if(loading) return <Loader />

    return (  
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            { 
    calls && calls.length > 0 ? 
    calls?.map((meeting : Call | CallRecording ) => {
        const isRecording = type === 'recordings';

        const title = isRecording 
            ? (meeting as CallRecording)?.filename?.substring(0, 20) || "No description"
            : (meeting as Call)?.state?.custom?.description?.substring(0, 20) || "Personal Meeting";

        const handleClick = isRecording
            ? () => router.push(`${(meeting as CallRecording)?.url}`)
            : () => router.push(`meeting/${(meeting as Call)?.id}`);

        const link = isRecording
            ? (meeting as CallRecording)?.url
            : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call)?.id}`;

        return (
            <MeetingCard
                key={isRecording ? (meeting as CallRecording)?.url : (meeting as Call)?.id}
                icon={type === "ended" ? '/icons/previous.svg' : type === "upcoming" ? '/icons/upcoming.svg' : '/icons/recordings.svg'}
                title={title}
                date = {(meeting as Call).state?.startsAt?.toLocaleString() || (meeting as CallRecording).start_time?.toLocaleString()}
                isPreviousMeeting={type === 'ended'}
                buttonIcon1={isRecording ? '/icons/play.svg' : undefined}
                buttonText={isRecording ? 'Play' : 'Start'}
                handleClick={handleClick}
                link={link}
            />
        )
            }) :
            <h1>{noCallsMessage}</h1> 
        }

        </div>
        )
    }

